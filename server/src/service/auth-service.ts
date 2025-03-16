import pool from "../config/database";
import HttpException from "../exception/http-exception";
import { Helper } from "../util/helper";

export class AuthService {
    private helper: Helper;

    constructor() {
        this.helper = new Helper();
    }

    // Kullanıcı Kaydı
    async register(username: string, email: string, password: string) {
        try {
            // Şifreyi hashle
            const hashedPassword = this.helper.hashPassword(password);

            // Kullanıcının olup olmadığını kontrol et
            const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
            if (existingUser.rows.length > 0) {
                throw new HttpException(409, "Kullanıcı zaten kayıtlı.");
            }

            // Kullanıcıyı kaydet
            const result = await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
                [username, email, hashedPassword]
            );

            const newUser = result.rows[0];

            return { user: newUser };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

    // Kullanıcı Girişi
    async login(email: string, password: string) {
        // Kullanıcıyı email ile bul
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            throw new HttpException(404, "Kullanıcı bulunamadı.");
        }

        const user = userResult.rows[0];

        // Şifreyi doğrula
        const isPasswordValid = this.helper.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, "Parola hatalı.");
        }

        const accessToken = this.helper.generateAccessToken({id: user.id, username: user.username, email: user.email });
        const refreshToken = this.helper.generateRefreshToken({id: user.id, username: user.username, email: user.email });

        return { user: { id: user.id, username: user.username, email: user.email }, accessToken, refreshToken };
    }

    async verifyUser(token: string) {
        try {
            const payload: any = this.helper.decodeToken(token);            
            const user = await pool.query("SELECT * FROM users WHERE id = $1", [payload.id]);
            if (!user) {
                throw new HttpException(404, "Kullanıcı bulunamadı.");
            }            
            return {
                username: user.rows[0].username,
                email: user.rows[0].email,
                role_id: user.rows[0].role_id
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);

        }
    }
}
