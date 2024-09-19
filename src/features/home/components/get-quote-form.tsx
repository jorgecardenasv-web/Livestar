import React, { useState, useEffect } from "react";
import {
  Button,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  gender: z.string({
    errorMap: () => ({ message: "Selecciona un género" }),
  }),
  postalCode: z.string().length(5, "El código postal debe tener 5 dígitos"),
  protectWho: z.string({
    errorMap: () => ({ message: "Selecciona a quién quieres proteger" }),
  }),
  partnerGender: z.enum(["hombre", "mujer", "otro"]).optional(),
  age: z.number().min(1, "La edad debe ser un número positivo"),
  partnerAge: z
    .number()
    .min(1, "La edad debe ser un número positivo")
    .optional(),
  childrenCount: z
    .number()
    .min(0)
    .max(10, "El número máximo de hijos es 10")
    .optional(),
  childrenAges: z
    .array(z.number().min(0, "La edad debe ser un número positivo"))
    .optional(),
  whatsapp: z
    .string()
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos"),
  email: z.string().email("Ingresa un correo electrónico válido"),
});

type FormData = z.infer<typeof formSchema>;

export const GetQuoteForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    postalCode: "",
    protectWho: "",
    partnerGender: undefined,
    age: 0,
    partnerAge: undefined,
    childrenCount: undefined,
    childrenAges: [],
    whatsapp: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showContactInfo, setShowContactInfo] = useState(false);

  const validateField = (field: keyof FormData, value: any) => {
    try {
      formSchema.shape[field].parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    if ((field === 'age' || field === 'partnerAge') && typeof value === 'number' && value < 18) {
      value = 18;
    }
    
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
      // Special handling for childrenCount
      if (field === 'childrenCount') {
        const count = typeof value === 'number' ? value : 0;
        updatedData.childrenAges = count > 0 ? Array(count).fill(0) : [];
      }
      
      return updatedData;
    });
    
    validateField(field, value);
  };

  const handleChildAgeChange = (index: number, value: number) => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: prev.childrenAges
        ? prev.childrenAges.map((age, i) => (i === index ? value : age))
        : [value],
    }));
    validateField(
      "childrenAges",
      formData.childrenAges?.map((age, i) => (i === index ? value : age)) || [
        value,
      ]
    );
  };

  const checkIfContactInfoShouldShow = (): boolean => {
    switch (formData.protectWho) {
      case "mi":
        return Boolean(
          formData.name &&
            formData.age &&
            formData.gender &&
            formData.postalCode
        );
      case "mi_pareja_y_a_mi":
        return Boolean(
          formData.name &&
            formData.age &&
            formData.gender &&
            formData.postalCode &&
            formData.partnerGender &&
            formData.partnerAge
        );
      case "familia":
      case "mis_ninos_y_yo":
      case "solo_mis_ninos":
        return Boolean(
          formData.name &&
            formData.age &&
            formData.gender &&
            formData.postalCode &&
            formData.childrenCount !== undefined &&
            formData.childrenAges &&
            Object.keys(formData.childrenAges).length ===
              formData.childrenCount &&
            Object.values(formData.childrenAges).every((age) => age > 0)
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    setShowContactInfo(checkIfContactInfoShouldShow());
  }, [formData]);

  const cleanFormData = (data: FormData): Partial<FormData> => {
    const cleanedData: Partial<FormData> = {
      name: data.name,
      gender: data.gender,
      postalCode: data.postalCode,
      protectWho: data.protectWho,
      age: data.age,
      whatsapp: data.whatsapp,
      email: data.email,
    };

    switch (data.protectWho) {
      case "mi_pareja_y_a_mi":
        cleanedData.partnerGender = data.partnerGender;
        cleanedData.partnerAge = data.partnerAge;
        break;
      case "familia":
      case "mis_ninos_y_yo":
      case "solo_mis_ninos":
        cleanedData.childrenCount = data.childrenCount;
        cleanedData.childrenAges = data.childrenAges;
        if (data.protectWho === "familia") {
          cleanedData.partnerGender = data.partnerGender;
          cleanedData.partnerAge = data.partnerAge;
        }
        break;
    }

    return cleanedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = formSchema.parse(formData);
      const cleanedData = cleanFormData(validatedData);
      const formDataString = JSON.stringify(cleanedData, null, 2);
      alert(`Formulario enviado con éxito:\n${formDataString}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path.join(".")] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
            1
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Datos Personales</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mi nombre es
            </label>
            <TextInput
              name="name"
              placeholder=""
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!errors.name}
              errorMessage={errors.name}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soy
            </label>
            <Select
              name="gender"
              placeholder="Seleccionar"
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              error={!!errors.gender}
            >
              <SelectItem value="hombre">Hombre</SelectItem>
              <SelectItem value="mujer">Mujer</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mi código postal es
            </label>
            <TextInput
              name="postalCode"
              placeholder=""
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              error={!!errors.postalCode}
              errorMessage={errors.postalCode}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiero proteger a
            </label>
            <Select
              name="protectWho"
              placeholder="Seleccionar"
              value={formData.protectWho}
              onValueChange={(value) => handleInputChange("protectWho", value)}
              error={!!errors.protectWho}
            >
              <SelectItem value="mi">mí</SelectItem>
              <SelectItem value="mi_pareja_y_a_mi">mí pareja y a mí</SelectItem>
              <SelectItem value="familia">
                la familia (niños, pareja)
              </SelectItem>
              <SelectItem value="mis_ninos_y_yo">mis niños y yo</SelectItem>
              <SelectItem value="solo_mis_ninos">solo mis niños</SelectItem>
            </Select>
            {errors.protectWho && (
              <p className="text-red-500 text-sm mt-1">{errors.protectWho}</p>
            )}
          </div>

          {(formData.protectWho === "mi_pareja_y_a_mi" ||
            formData.protectWho === "familia") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mi pareja es
              </label>
              <Select
                name="partnerGender"
                placeholder="Seleccionar"
                value={formData.partnerGender}
                onValueChange={(value) =>
                  handleInputChange("partnerGender", value)
                }
                error={!!errors.partnerGender}
              >
                <SelectItem value="hombre">Hombre</SelectItem>
                <SelectItem value="mujer">Mujer</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </Select>
              {errors.partnerGender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.partnerGender}
                </p>
              )}
            </div>
          )}

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tengo
              </label>
              <NumberInput
                name="age"
                placeholder=""
                value={formData.age}
                onValueChange={(value) => handleInputChange("age", value)}
                error={!!errors.age}
                errorMessage={errors.age}
                className="w-full"
                min={18}
              />
            </div>
            {(formData.protectWho === "mi_pareja_y_a_mi" ||
              formData.protectWho === "familia") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  mi pareja tiene
                </label>
                <NumberInput
                  name="partnerAge"
                  placeholder=""
                  value={formData.partnerAge}
                  onValueChange={(value) =>
                    handleInputChange("partnerAge", value)
                  }
                  error={!!errors.partnerAge}
                  errorMessage={errors.partnerAge}
                  className="w-full"
                />
              </div>
            )}
            {(formData.protectWho === "familia" ||
              formData.protectWho === "mis_ninos_y_yo" ||
              formData.protectWho === "solo_mis_ninos") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de hijos
                  </label>
                  <NumberInput
                    name="childrenCount"
                    placeholder="Nº de hijos"
                    value={formData.childrenCount}
                    onValueChange={(value) =>
                      handleInputChange("childrenCount", value)
                    }
                    error={!!errors.childrenCount}
                    errorMessage={errors.childrenCount}
                    className="w-full"
                    min={0}
                    max={10}
                  />
                </div>
                {formData.childrenCount && formData.childrenCount > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.childrenCount === 1
                        ? "Edad de mi hijo"
                        : `Edades de mis ${formData.childrenCount} hijos`}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.childrenAges?.map((age, index) => (
                        <NumberInput
                          key={index}
                          name={`childAge${index}`}
                          placeholder={`Hijo ${index + 1}`}
                          value={age}
                          onValueChange={(value) =>
                            handleChildAgeChange(index, value)
                          }
                          error={!!errors[`childrenAges.${index}`]}
                          errorMessage={errors[`childrenAges.${index}`]}
                          className="w-20"
                          min={0}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showContactInfo && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              Datos de contacto
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mi whatsapp es
              </label>
              <TextInput
                name="whatsapp"
                placeholder=""
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                error={!!errors.whatsapp}
                errorMessage={errors.whatsapp}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mi correo es
              </label>
              <TextInput
                name="email"
                placeholder=""
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                errorMessage={errors.email}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg w-full mt-6 hover:bg-blue-600"
      >
        Cotizar
      </Button>
    </form>
  );
};
