"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Types
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  runtime?: number;
  genres?: {id: number; name: string}[];
}

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

// TMDB API configuration
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if API key is available
  useEffect(() => {
    if (!TMDB_API_KEY) {
      setError('TMDB API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
    }
  }, []);

  // Questions to ask the user
  const questions: Question[] = [
    {
      id: "mood",
      text: "Şu anki ruh haliniz nasıl?",
      options: [
        { value: "happy", label: "Mutlu ve neşeli" },
        { value: "sad", label: "Hüzünlü veya düşünceli" },
        { value: "excited", label: "Heyecanlı ve enerjik" },
        { value: "relaxed", label: "Sakin ve rahat" },
        { value: "stressed", label: "Stresli veya gergin" }
      ]
    },
    {
      id: "genre",
      text: "Hangi film türünü tercih edersiniz?",
      options: [
        { value: "28", label: "Aksiyon" },
        { value: "35", label: "Komedi" },
        { value: "18", label: "Drama" },
        { value: "27", label: "Korku" },
        { value: "10749", label: "Romantik" },
        { value: "878", label: "Bilim Kurgu" },
        { value: "53", label: "Gerilim" }
      ]
    },
    {
      id: "length",
      text: "Film uzunluğu tercihiniz nedir?",
      options: [
        { value: "short", label: "Kısa (90 dakikadan az)" },
        { value: "medium", label: "Orta (90-120 dakika)" },
        { value: "long", label: "Uzun (120 dakikadan fazla)" }
      ]
    },
    {
      id: "company",
      text: "Filmi kiminle izleyeceksiniz?",
      options: [
        { value: "alone", label: "Yalnız" },
        { value: "partner", label: "Eşim/Sevgilim ile" },
        { value: "family", label: "Ailemle" },
        { value: "friends", label: "Arkadaşlarımla" }
      ]
    },
    {
      id: "era",
      text: "Hangi dönem filmlerini tercih edersiniz?",
      options: [
        { value: "new", label: "Yeni filmler (son 5 yıl)" },
        { value: "recent", label: "Yakın dönem (5-15 yıl)" },
        { value: "classic", label: "Klasik filmler (15+ yıl)" },
        { value: "any", label: "Fark etmez" }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      fetchRecommendations();
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!TMDB_API_KEY) {
        throw new Error('TMDB API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
      }
      
      // Build query parameters based on user answers
      const genreId = answers.genre;
      const releaseYear = getYearRangeParam(answers.era);
      
      // Fetch movies from TMDB
      const response = await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=tr-TR&sort_by=popularity.desc&include_adult=false&with_genres=${genreId}${releaseYear}&page=1`
      );
      
      if (!response.ok) {
        throw new Error('API isteği başarısız oldu');
      }
      
      const data = await response.json();
      let movies = data.results.slice(0, 20);
      
      // Fetch additional details for each movie
      const moviesWithDetails = await Promise.all(
        movies.map(async (movie: Movie) => {
          const detailsResponse = await fetch(
            `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=tr-TR`
          );
          
          if (detailsResponse.ok) {
            const details = await detailsResponse.json();
            return { ...movie, runtime: details.runtime, genres: details.genres };
          }
          
          return movie;
        })
      );
      
      // Filter by runtime if specified
      let filteredMovies = filterByRuntime(moviesWithDetails, answers.length);
      
      // Further personalize based on mood and company
      filteredMovies = personalizeByMoodAndCompany(filteredMovies, answers.mood, answers.company);
      
      setRecommendedMovies(filteredMovies);
      setShowResults(true);
    } catch (error) {
      console.error('Film önerileri alınırken hata oluştu:', error);
      setError(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getYearRangeParam = (era: string) => {
    const currentYear = new Date().getFullYear();
    
    switch (era) {
      case 'new':
        return `&primary_release_date.gte=${currentYear - 5}-01-01`;
      case 'recent':
        return `&primary_release_date.gte=${currentYear - 15}-01-01&primary_release_date.lte=${currentYear - 5}-12-31`;
      case 'classic':
        return `&primary_release_date.lte=${currentYear - 15}-12-31`;
      default:
        return '';
    }
  };

  const filterByRuntime = (movies: Movie[], lengthPreference: string) => {
    if (!lengthPreference || lengthPreference === 'any') return movies;
    
    return movies.filter(movie => {
      if (!movie.runtime) return true;
      
      switch (lengthPreference) {
        case 'short':
          return movie.runtime < 90;
        case 'medium':
          return movie.runtime >= 90 && movie.runtime <= 120;
        case 'long':
          return movie.runtime > 120;
        default:
          return true;
      }
    });
  };

  const personalizeByMoodAndCompany = (movies: Movie[], mood: string, company: string) => {
    let sortedMovies = [...movies];
    
    sortedMovies.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Ruh haline göre puanlama
      switch (mood) {
        case 'happy':
          // Mutlu ruh hali için yüksek puanlı ve popüler filmler
          if (a.vote_average > 7.5) scoreA += 3;
          if (b.vote_average > 7.5) scoreB += 3;
          break;
        case 'sad':
          // Hüzünlü ruh hali için daha dramatik filmler
          if (a.vote_average > 8) scoreA += 2;
          if (b.vote_average > 8) scoreB += 2;
          break;
        case 'excited':
          // Heyecanlı ruh hali için yüksek tempolu filmler
          if (a.vote_average > 7) scoreA += 2;
          if (b.vote_average > 7) scoreB += 2;
          break;
        case 'relaxed':
          // Rahat ruh hali için orta puanlı filmler
          if (a.vote_average > 6.5 && a.vote_average < 8) scoreA += 2;
          if (b.vote_average > 6.5 && b.vote_average < 8) scoreB += 2;
          break;
        case 'stressed':
          // Stresli ruh hali için rahatlatıcı filmler
          if (a.vote_average > 7 && a.vote_average < 8.5) scoreA += 2;
          if (b.vote_average > 7 && b.vote_average < 8.5) scoreB += 2;
          break;
      }

      // İzleme arkadaşına göre puanlama
      switch (company) {
        case 'family':
          // Aile için uygun filmler
          if (a.vote_average > 7) scoreA += 2;
          if (b.vote_average > 7) scoreB += 2;
          break;
        case 'partner':
          // Eş/Sevgili için romantik veya yüksek puanlı filmler
          if (a.vote_average > 7.5) scoreA += 2;
          if (b.vote_average > 7.5) scoreB += 2;
          break;
        case 'friends':
          // Arkadaşlarla izlemek için eğlenceli filmler
          if (a.vote_average > 6.5) scoreA += 1;
          if (b.vote_average > 6.5) scoreB += 1;
          break;
        case 'alone':
          // Yalnız izlemek için daha derin filmler
          if (a.vote_average > 7.8) scoreA += 2;
          if (b.vote_average > 7.8) scoreB += 2;
          break;
      }
      
      return scoreB - scoreA;
    });
    
    return sortedMovies;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendedMovies([]);
    setShowResults(false);
    setSelectedMovie(null);
  };

  const showMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  // Progress percentage for the progress bar
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Quiz Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                Film Öneri Asistanı
              </h1>
              <p className="mt-2 text-indigo-100">
                Sizin için en uygun filmleri bulmamıza yardımcı olun
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-100">
                <p>{error}</p>
              </div>
            )}

            {/* Quiz Content */}
            {!showResults ? (
              <div className="space-y-8">
                {!loading ? (
                  <>
                    {/* Progress */}
                    <div className="relative">
                      <div className="flex justify-between text-sm text-indigo-100 mb-2">
                        <span>Soru {currentQuestionIndex + 1}/{questions.length}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-300 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <div>
                      <h2 className="text-xl font-medium text-white mb-6">
                        {currentQuestion.text}
                      </h2>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className="w-full p-4 text-left text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/30"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    {currentQuestionIndex > 0 && (
                      <div className="pt-4 text-center">
                        <button
                          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                          className="text-indigo-100 hover:text-white transition-colors"
                        >
                          ← Önceki Soru
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <div className="inline-block">
                      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                    <p className="mt-4 text-indigo-100">
                      Film önerileri hazırlanıyor...
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {selectedMovie ? (
                  // Movie Details View
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-start mb-6">
                      <button 
                        onClick={closeMovieDetails}
                        className="text-indigo-100 hover:text-white transition-colors"
                      >
                        ← Listeye Dön
                      </button>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white">
                        {selectedMovie.title}
                      </h2>

                      <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg">
                        <Image 
                          src={selectedMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${selectedMovie.poster_path}` : '/placeholder.svg'} 
                          alt={selectedMovie.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-indigo-100">
                        <span>{selectedMovie.release_date ? new Date(selectedMovie.release_date).getFullYear() : 'Bilinmiyor'}</span>
                        {selectedMovie.runtime && (
                          <span>{selectedMovie.runtime} dakika</span>
                        )}
                        <span className="flex items-center">
                          <span className="text-yellow-300 mr-1">★</span>
                          {selectedMovie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      {selectedMovie.genres && (
                        <div className="flex flex-wrap gap-2">
                          {selectedMovie.genres.map(genre => (
                            <span 
                              key={genre.id} 
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-indigo-100"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-indigo-100 leading-relaxed">
                        {selectedMovie.overview || 'Bu film için açıklama bulunmuyor.'}
                      </p>

                      <div className="pt-4">
                        <a 
                          href={`https://www.themoviedb.org/movie/${selectedMovie.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex px-6 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition-colors font-medium"
                        >
                          TMDB'de Görüntüle
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Results View
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                      Size Özel Film Önerileri
                    </h2>

                    {recommendedMovies.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {recommendedMovies.map((movie) => (
                          <div 
                            key={movie.id} 
                            className="group cursor-pointer"
                            onClick={() => showMovieDetails(movie)}
                          >
                            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg mb-2">
                              <Image 
                                src={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.svg'} 
                                alt={movie.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <span className="text-white text-sm">Detayları Gör</span>
                              </div>
                            </div>
                            <h3 className="text-white font-medium text-sm line-clamp-1">
                              {movie.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-indigo-100">
                              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Bilinmiyor'}</span>
                              <span>★ {movie.vote_average.toFixed(1)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-indigo-100">
                          Üzgünüz, kriterlerinize uygun film bulunamadı.
                        </p>
                      </div>
                    )}

                    <div className="mt-8 text-center">
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition-colors font-medium"
                      >
                        Yeniden Başla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-indigo-100/50 text-sm">
          <p>Tolga BAYRAK</p>
        </div>
      </div>
    </div>
  );
} 