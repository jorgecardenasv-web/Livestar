import { useState, useEffect } from 'react';
import { z } from 'zod';
import { formSchema, FormData } from '../schemas/form-schema';

export const useGetQuoteForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    postalCode: '',
    protectWho: '',
    partnerGender: undefined,
    age: 0,
    partnerAge: undefined,
    childrenCount: undefined,
    childrenAges: [],
    whatsapp: '',
    email: '',
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
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
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
      formData.childrenAges?.map((age, i) => (i === index ? value : age)) || [value]
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

  return {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildAgeChange,
    handleSubmit,
  };
};