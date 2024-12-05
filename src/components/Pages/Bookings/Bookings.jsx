import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookinsThunk } from '../../../context/slices/bookinsSlice';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookins, loading, error } = useSelector((state) => state.bookins);
  const [activeTab, setActiveTab] = useState('current'); // Estado para gestionar la pestaña activa

  useEffect(() => {
    dispatch(fetchAllBookinsThunk());
  }, [dispatch]);

  const now = new Date();
  const currentBookings = bookins.filter((booking) => new Date(booking.date) >= now);
  const pastBookings = bookins.filter((booking) => new Date(booking.date) < now);

  return (
    <div className='main-page mt-[68px] py-8'>
      <h1 className='title mt-3 text-gold'>Mis Reservas</h1> {/* Título en dorado */}

      {loading && <p className="text-lg text-gray-400 animate-pulse">Cargando reservas...</p>}
      {error && <p className="text-lg text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
       
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'current' ? 'bg-yellow-500 bg-opacity-50 text-white' : 'bg-gray-800 text-white'}`}
              onClick={() => setActiveTab('current')}
            >
              Reservas Actuales
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'past' ? 'bg-yellow-500 bg-opacity-50 text-white' : 'bg-gray-800 text-white'}`}
              onClick={() => setActiveTab('past')}
            >
              Reservas Pasadas
            </button>
          </div>

          
          <section className="w-full md:max-w-[592px] mx-auto">
            {activeTab === 'current' && (
              <>
                {currentBookings.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 w-full max-w-sm"
                      >
                        <h3 className="text-xl font-bold text-gold">{booking.name}</h3> {/* Nombre en dorado */}
                        <p className="text-white mt-2">{booking.date}</p> {/* Fecha en blanco */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col justify-center items-center text-gray-400 text-lg">
                    <p className="text-white">No hay reservas actuales</p>
                    <div className="mt-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">🔔</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'past' && (
              <>
                {pastBookings.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 w-full max-w-sm"
                      >
                        <h3 className="text-xl font-bold text-gold">{booking.name}</h3> {/* Nombre en dorado */}
                        <p className="text-white mt-2">{booking.date}</p> {/* Fecha en blanco */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col justify-center items-center text-gray-400 text-lg">
                    <p className="text-white">No hay reservas pasadas</p>
                    <div className="mt-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">📜</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Bookings;
