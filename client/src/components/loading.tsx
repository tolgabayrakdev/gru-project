export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex items-center">
                <div className="animate-spin rounded-full border-4 border-orange-300 border-t-orange-600 h-5 w-5" />
                <p className="text-orange-500 ml-1 dark:text-orange-400">Yükleniyor...</p>
            </div>
        </div>
    )
}