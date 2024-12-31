'use client'

import { useState } from 'react'

import { DollarSign } from 'lucide-react'
import { TextInput } from '@/shared/components/ui/text-input'

export function DeduciblesTable() {
  const [deducibles, setDeducibles] = useState([
    { nivel: 'A', deducible: 0 },
    { nivel: 'B', deducible: 0 },
    { nivel: 'C', deducible: 0 },
    { nivel: 'D', deducible: 0 }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/deducibles', {
      method: 'POST',
      body: JSON.stringify({ deducibles })
    })
    // Manejar respuesta
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configurar Deducibles</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {deducibles.map((deducible, index) => (
          <TextInput
            key={deducible.nivel}
            label={`Nivel ${deducible.nivel}`}
            type="number"
            value={deducible.deducible}
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            onChange={(e) => {
              const newDeducibles = [...deducibles]
              newDeducibles[index].deducible = Number(e.target.value)
              setDeducibles(newDeducibles)
            }}
          />
        ))}
        <button type="submit" className="bg-primary text-white rounded-lg px-4 py-2 col-span-2">
          Guardar Deducibles
        </button>
      </form>
    </div>
  )
}
