"use client";
import { useState } from 'react';

interface Movie {
  title: string;
  year: string;
  description: string;
  imdbRating: string;
  imageUrl: string;
}

export default function Home() {
  const [selectedType, setSelectedType] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);

  const movieDatabase: Record<string, Movie[]> = {
    'Aksiyon': [
      {
        title: 'John Wick',
        year: '2014',
        description: 'Emekli bir suikastçı, köpeğinin öldürülmesinden sonra intikam için geri döner.',
        imdbRating: '7.4',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg'
      },
      {
        title: 'Mad Max: Fury Road',
        year: '2015',
        description: 'Post-apokaliptik bir dünyada, Max ve Furiosa hayatta kalmak için mücadele eder.',
        imdbRating: '8.1',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
      }
    ],
    'Komedi': [
      {
        title: 'Superbad',
        year: '2007',
        description: 'İki liseli arkadaş, mezuniyet partisine gitmeden önce eğlenceli bir maceraya atılır.',
        imdbRating: '7.6',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg'
      },
      {
        title: 'Hangover',
        year: '2009',
        description: 'Las Vegas\'ta bekarlığa veda partisinden sonra arkadaşlarını arayan üç adamın hikayesi.',
        imdbRating: '7.7',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
      }
    ]
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowRecommendation(true);
  };

  const resetSelection = () => {
    setSelectedType('');
    setShowRecommendation(false);
  };

  const getRecommendedMovies = () => {
    return movieDatabase[selectedType] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Film Öneri Asistanı
          </h1>
          
          {!showRecommendation ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-600 mb-6">
                  Ne tür film izlemek istersiniz?
                </p>
                <div className="grid gap-3">
                  {['Aksiyon', 'Komedi'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className="w-full py-3 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Size Özel Film Önerileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getRecommendedMovies().map((movie) => (
                  <div key={movie.title} className="bg-purple-50 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={movie.imageUrl} 
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800">{movie.title}</h3>
                      <p className="text-sm text-gray-600">{movie.year}</p>
                      <p className="text-sm text-gray-600 mt-2">{movie.description}</p>
                      <div className="mt-3 flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-gray-700">{movie.imdbRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={resetSelection}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Yeniden Başla
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
