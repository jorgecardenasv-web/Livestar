/* Didnt work as i wanted :D */

/* import React from 'react';
import { NumberInput, Select, SelectItem, TextInput } from "@tremor/react";
import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "Por favor escribe tu nombre"),
  gender: z.string().min(1, "Indica tu genero"),
  postalCode: z.string().length(5, "El código postal debe tener 5 dígitos"),
  protectWho: z.string().min(1, "Selecciona a quién quieres proteger"),
});

const protectWhoSchemas = {
  solo_yo: z.object({
    age: z.number().min(18, "Debes de ser mayor de 18 años"),
  }),
  mi_pareja_y_yo: z.object({
    age: z.number().min(18, "Debes de ser mayor de 18 años"),
    partnerGender: z.string().min(1, "Indica el genero de pareja"),
    partnerAge: z.number().min(18, "Tu pareja debe ser mayor de 18 años"),
  }),
  familia: z.object({
    age: z.number().min(18, "Debes de ser mayor de 18 años"),
    partnerGender: z.string().min(1, "Indica el genero de pareja"),
    partnerAge: z.number().min(18, "Tu pareja debe ser mayor de 18 años"),
    childrenCount: z.number().min(1, "Indica el número de hijos"),
    childrenAges: z.array(z.number().min(0)),
  }),
  mis_hijos_y_yo: z.object({
    age: z.number().min(18, "Debes de ser mayor de 18 años"),
    childrenCount: z.number().min(1, "Indica el número de hijos"),
    childrenAges: z.array(z.number().min(0)),
  }),
  solo_mis_hijos: z.object({
    childrenCount: z.number().min(1, "Indica el número de hijos"),
    childrenAges: z.array(z.number().min(0)),
  }),
  mis_padres: z.object({
      momName: z.string().min(1, "Por favor escribe el nombre de mamá"),
      dadName: z.string().min(1, "Por favor escribe el nombre de papá"),
      momAge: z.number().min(18, "Tu madre debe ser mayor de 18 años"),
      dadAge: z.number().min(18, "Tu padre debe ser mayor de 18 años"),
  }),
  relationship: z.object({
    relationship: z.string().min(1, "Selecciona quines"),
    protectedCount: z.number().min(1, "Selecciona cuantos"),
    protectedAges: z.array(z.number().min(0)),
  }),
};

const formFields = {
  solo_yo: ['age'],
  mi_pareja_y_yo: ['age', 'partnerGender', 'partnerAge'],
  familia: ['age', 'partnerGender', 'partnerAge', 'childrenCount', 'childrenAges'],
  mis_hijos_y_yo: ['age', 'childrenCount', 'childrenAges'],
  solo_mis_hijos: ['childrenCount', 'childrenAges'],
  mis_padres: ['momName', 'dadName', 'momAge', 'dadAge'],
  relationship: ['relationship', 'protectedCount', 'protectedAges'],
};

const getSchema = (protectWho: string) => {
  return baseSchema.extend(protectWhoSchemas[protectWho] || {});
};


const getFormFields = (protectWho: string) => {
  return ['name', 'gender', 'postalCode', 'protectWho', ...(formFields[protectWho] || [])];
};

interface FormData {
  [key: string]: any;
}

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
}

export const PersonalInfoSectionDynamic: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange,
}) => {
  const [currentSchema, setCurrentSchema] = React.useState(baseSchema);
  const [currentFields, setCurrentFields] = React.useState(['name', 'gender', 'postalCode', 'protectWho']);

  React.useEffect(() => {
    const newSchema = getSchema(formData.protectWho);
    const newFields = getFormFields(formData.protectWho);
    setCurrentSchema(newSchema);
    setCurrentFields(newFields);
  }, [formData.protectWho]);

  const validateForm = () => {
    try {
      currentSchema.parse(formData);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      return {};
    }
  };

  const renderField = (field: string) => {
    switch (field) {
      case 'protectWho':
        return (
          <Select
            name={field}
            placeholder="Seleccionar"
            value={formData[field]}
            onValueChange={(value) => handleInputChange(field, value)}
            error={!!errors[field]}
          >
            <SelectItem value="solo_yo">Solo yo</SelectItem>
            <SelectItem value="mi_pareja_y_yo">Mi pareja y yo</SelectItem>
            <SelectItem value="familia">Familia</SelectItem>
            <SelectItem value="mis_hijos_y_yo">Mis hijos y yo</SelectItem>
            <SelectItem value="solo_mis_hijos">Solo mis hijos</SelectItem>
            <SelectItem value="mis_padres">Mis padres</SelectItem>
            <SelectItem value="relationship">Relationship</SelectItem>
          </Select>
        )
      case 'name':
      case 'postalCode':
        return (
          <TextInput
            name={field}
            placeholder={`Ej: ${field === 'name' ? 'Juan Perez' : '04000'}`}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            error={!!errors[field]}
            errorMessage={errors[field]}
          />
        );
      case 'gender':
      case 'partnerGender':
        return (
          <Select
            name={field}
            placeholder="Seleccionar"
            value={formData[field]}
            onValueChange={(value) => handleInputChange(field, value)}
            error={!!errors[field]}
          >
            <SelectItem value="hombre">Hombre</SelectItem>
            <SelectItem value="mujer">Mujer</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </Select>
        );
      case 'age':
      case 'partnerAge':
      case 'childrenCount':
        return (
          <NumberInput
            name={field}
            placeholder={`Ej: ${field.includes('Age') ? '18' : '1'}`}
            value={formData[field]}
            onValueChange={(value) => handleInputChange(field, value)}
            error={!!errors[field]}
            errorMessage={errors[field]}
            min={0}
            max={field.includes('Count') ? 10 : 100}
          />
        );
      case 'childrenAges':
        return formData.childrenCount > 0 ? (
          <div>
            {Array.from({ length: formData.childrenCount }).map((_, index) => (
              <NumberInput
                key={index}
                name={`childAge${index}`}
                placeholder={`Hijo ${index + 1}`}
                value={formData.childrenAges?.[index] || ''}
                onValueChange={(value) => {
                  const newAges = [...(formData.childrenAges || [])];
                  newAges[index] = value;
                  handleInputChange('childrenAges', newAges);
                }}
                error={!!errors[`childrenAges.${index}`]}
                errorMessage={errors[`childrenAges.${index}`]}
                min={0}
              />
            ))}
          </div>
        ) : null;
      case 'relationship':
        return (
          <Select
            name={field}
            placeholder="Seleccionar"
            value={formData[field]}
            onValueChange={(value) => handleInputChange(field, value)}
            error={!!errors[field]}
          >
            <SelectItem value="hermano">Hermano</SelectItem>
            <SelectItem value="amigo">Amigo</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </Select>
        )
        case 'protectedCount':
          return (
            <NumberInput
              name={field}
              placeholder={`Ej: ${field.includes('Age') ? '18' : '1'}`}
              value={formData[field]}
              onValueChange={(value) => handleInputChange(field, value)}
              error={!!errors[field]}
              errorMessage={errors[field]}
              min={0}
              max={field.includes('Count') ? 10 : 100}
            />
          )
        case 'protectedAges':
          return formData.protectedCount > 0 ? (
            <div>
              {Array.from({ length: formData.protectedCount }).map((_, index) => (
                <NumberInput
                  key={index}
                  name={`protectedAge${index}`}
                  placeholder={`Hijo ${index + 1}`}
                  value={formData.protectedAges?.[index] || ''}
                  onValueChange={(value) => {
                    const newAges = [...(formData.protectedAges || [])];
                    newAges[index] = value;
                    handleInputChange('protectedAges', newAges);
                  }}
                  error={!!errors[`protectedAges.${index}`]}
                  errorMessage={errors[`protectedAges.${index}`]}
                  min={0}
                />
              ))}
            </div>
          ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          1
        </span>
        <h3 className="text-2xl font-bold text-gray-800">Datos Personales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentFields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}; */