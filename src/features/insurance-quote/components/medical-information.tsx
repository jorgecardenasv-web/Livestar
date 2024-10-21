"use client";

import {
  Card,
  Text,
  TextInput,
  Select,
  SelectItem,
  DatePicker,
} from "@tremor/react";
import { useState } from "react";

type RadioOption = "Sí" | "No" | "Sano" | "En tratamiento";

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  onChange: (name: string, value: RadioOption) => void;
}

interface SelectedOptions {
  [key: string]: RadioOption;
}

export const MedicalInformation = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleRadioChange = (name: string, value: RadioOption) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    onChange,
  }) => (
    <div className="flex space-x-4">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedOptions[name] === option}
            onChange={() => onChange(name, option)}
            className="form-radio text-primary"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          3
        </span>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Información médica
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-5">
            1.- ¿Algún solicitante padece o ha padecido alguna enfermedad como
            hipertensión arterial, infarto, hepatitis, diabetes, epilepsia,
            esclerosis, fiebre reumática, SIDA, cáncer, tumores, COVID- 19;
            enfermedades mentales, congénitas, inmunológicas u otras de tipo
            renal, pulmonar, neurológico o cardiovascular?
          </label>
          <RadioGroup
            name="answer"
            options={["Sí", "No"]}
            onChange={handleRadioChange}
          />
        </div>

        {selectedOptions.answer === "Sí" && (
          <div className="grid grid-cols-2 gap-4">
            <TextInput placeholder="Nombre del padecimiento" />
            <Select placeholder="Tipo de evento">
              <SelectItem value="1">Opción 1</SelectItem>
              <SelectItem value="2">Opción 2</SelectItem>
            </Select>
            <DatePicker placeholder="Fecha de inicio" />
            <Select placeholder="Tipo de tratamiento">
              <SelectItem value="1">Opción 1</SelectItem>
              <SelectItem value="2">Opción 2</SelectItem>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
              ¿Estuvo hospitalizado?
            </label>
            <RadioGroup
              name="hospitalizado"
              options={["Sí", "No"]}
              onChange={handleRadioChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
              ¿Quedó con alguna complicación?
            </label>
            <RadioGroup
              name="complicacion"
              options={["Sí", "No"]}
              onChange={handleRadioChange}
            />
          </div>
        </div>

        {selectedOptions.complicacion === "Sí" && (
          <TextInput placeholder="¿Cuál?" />
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
              Estado actual de salud
            </label>
            <RadioGroup
              name="estado-salud"
              options={["Sano", "En tratamiento"]}
              onChange={handleRadioChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
              ¿Actualmente toma algún medicamento?
            </label>
            <RadioGroup
              name="medicamento"
              options={["Sí", "No"]}
              onChange={handleRadioChange}
            />
          </div>
        </div>

        {selectedOptions.medicamento === "Sí" && (
          <TextInput placeholder="¿Cuál?" />
        )}
      </div>
    </>
  );
};
