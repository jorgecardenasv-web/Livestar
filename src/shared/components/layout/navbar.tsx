"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg"
import { Car, HeartPulse, Hospital, Hotel, HomeIcon as House, Menu, ChevronDown, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="text-white pt-5 md:pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={Logo}
              alt="Logo Principal"
              width={200}
              height={58}
              className="w-[180px] lg:w-[238px] md:pr-4"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="px-6 py-2 bg-white text-[#223E99] rounded-md hover:bg-opacity-90 transition-colors font-medium">
              Cotizadores
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors font-medium">
                <span>Seguros</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-60 bg-[#223E99] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="https://livestar.mx/seguros/vida/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                    <HeartPulse className="w-5 h-5 mr-2" />
                    <span>Vida</span>
                  </Link>
                  <Link href="https://livestar.mx/seguros/gastos-medicos/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                    <Hospital className="w-5 h-5 mr-2" />
                    <span>Gastos Médicos</span>
                  </Link>
                  <Link href="https://livestar.mx/seguros/vehiculos/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                    <Car className="w-5 h-5 mr-2" />
                    <span>Vehículos</span>
                  </Link>
                  <Link href="https://livestar.mx/seguros/empresas/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                    <Hotel className="w-5 h-5 mr-2" />
                    <span>Empresas</span>
                  </Link>
                  <Link href="https://livestar.mx/seguros/hogar/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                    <House className="w-5 h-5 mr-2" />
                    <span>Hogar</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="https://livestar.mx/nosotros/" className="text-border text-white hover:text-gray-200 transition-colors font-medium">
              Nosotros
            </Link>
            <Link href="https://livestar.mx/contacto/" className="text-white hover:text-gray-200 transition-colors font-medium">
              Contacto
            </Link>
            <Link href="https://livestar.mx/en-confianza/" className="text-white hover:text-gray-200 transition-colors font-medium">
              En confianza
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-[#00BFFF] transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#223E99] text-white p-0">
              <nav className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10">
                  <Image
                    src={Logo}
                    alt="Logo Principal"
                    width={200}
                    height={58}
                    className="w-[180px]"
                  />
                </div>
                <div className="flex-grow overflow-y-auto">
                  <div className="px-4 py-6 space-y-6">
                    <button className="w-full text-left px-3 py-2 bg-white text-[#223E99] rounded-md font-medium">
                      Cotizadores
                    </button>
                    
                    <div>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium"
                      >
                        <span>Seguros</span>
                        <ChevronDown className={`w-4 h-4 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showDropdown && (
                        <div className="mt-2 pl-4 space-y-2">
                          <Link href="https://livestar.mx/seguros/vida/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                            <HeartPulse className="w-5 h-5 mr-2" />
                            <span>Vida</span>
                          </Link>
                          <Link href="https://livestar.mx/seguros/gastos-medicos/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                            <Hospital className="w-5 h-5 mr-2" />
                            <span>Gastos Médicos</span>
                          </Link>
                          <Link href="https://livestar.mx/seguros/vehiculos/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                            <Car className="w-5 h-5 mr-2" />
                            <span>Vehículos</span>
                          </Link>
                          <Link href="https://livestar.mx/seguros/empresas/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                            <Hotel className="w-5 h-5 mr-2" />
                            <span>Empresas</span>
                          </Link>
                          <Link href="https://livestar.mx/seguros/hogar/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                            <House className="w-5 h-5 mr-2" />
                            <span>Hogar</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    <Link href="https://livestar.mx/nosotros/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                      Nosotros
                    </Link>
                    <Link href="https://livestar.mx/contacto/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                      Contacto
                    </Link>
                    <Link href="https://livestar.mx/en-confianza/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                      En confianza
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
