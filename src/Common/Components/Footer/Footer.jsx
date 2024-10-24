
import React from "react";
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp} from 'react-icons/fa'
import isoG from "../img/isoG.svg"

const sections =[
    {
        title: 'Soluciones',
        items:['Marketing', 'Analytics', 'Commerce', 'Data', 'Cloud']
    },
    {
        title: 'Soporte',
        items: ['Pricing', 'Documentation', 'Guides', 'API', 'Status' ]
    },
    {
        title: 'Compañía',
        items: ['About', 'Blog', 'Jobs', 'Press', 'Partners' ]
    },
    {
        title: 'Legal',
        items: ['Claims', 'Privacy', 'Terms', 'Policies', 'Conditions' ]
    }
]

const items = [
    {
        name: 'Facebook',
        icon: FaFacebook,
        link: 'https://facebook.com/'
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        link: 'https://www.instagram.com/'
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        link: 'https://x.com/'
    },
    {
        name: 'Youtube',
        icon: FaYoutube,
        link: 'https://Youtube.com/'
    },
    {
        name: 'Whatsapp',
        icon: FaWhatsapp,
        link: ''
    }
]


const Footer = () =>{
    return(
        <>
        <div className="w-full mt-24 bg-slate-900 text-gray-300 py-y px-2">
            <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
                {

                    sections.map((section, index)=>(
                        <div key={index}>
                            <h6 className= "font-bold uppercase pt-2">
                                {section.title}
                            </h6>
                            <ul>
                                {section.items.map((item, i)=>(
                                    <li key={1}
                                    className="py-1 text-gray-500 hover:text-white
                                    cursor-pointer">
                                        {item}

                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                }

                <div className="col-span-2 pt-8 md:pt-2">
                    <p className="font-bold uppercase" >
                        Suscríbete a nuestro newsletter!
                    </p>

                    <p>
                        Las últimas actualizaciones, artículos y recursos enviados a tu correo semanalmente.
                    </p>
                    <form className="flex flex-col sm:flex-row">
                        <input type="email" placeholder="Enter email address"
                        className="w-full p-2 mr-4 rounded-md mb-4" />
                        <button className="p-2 mb-4">
                            Subscríbete
                        </button>
                    </form>
                </div>
            </div>

                {/* Copyright & Social Icons*/}
                <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row items-center text-center text-gray-500">

                    <div className="flex items-center">
                        <img src={isoG} alt="Isologotipo" className="w-32 h-32 sm:w-80 sm:h-50 mr-2" />
                        <p className="py-4">
                            &copy; 2024 Royal Ride Spa. Todos los derechos reservados.
                        </p>
                    </div>

                    <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
                        {
                        items.map((x, index) => (
                        <a key={index} href={x.link} target="_blank" rel="noopener noreferrer">
                            <x.icon className="hover:text-white cursor-pointer" />
                            </a>
                            ))
                        }
                            </div>

                </div>
        </div>
        </>
    )
}

export default Footer
