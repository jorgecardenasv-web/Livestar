import { NumberInput, Select, SelectItem, TextInput } from "@tremor/react";
import { FormData } from "../schemas/form-schema";

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
  handleChildChange: (
    index: number,
    field: string,
    value: string | number,
  ) => void;
  handleProtectedPersonChange: (
    index: number,
    field: string,
    value: string | number,
  ) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange,
  handleChildChange,
  handleProtectedPersonChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          1
        </span>
        <h3 className="text-2xl font-bold text-gray-800">Datos Personales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mi nombre es
          </label>
          <TextInput
            name="name"
            placeholder="Ej: Juan Perez"
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
            placeholder="Ej: 04000"
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
            <SelectItem value="solo_yo">Solo yo</SelectItem>
            <SelectItem value="mi_pareja_y_yo">Mi pareja y yo</SelectItem>
            <SelectItem value="familia">Mi familia completa</SelectItem>
            <SelectItem value="mis_hijos_y_yo">Mis hijos y yo</SelectItem>
            <SelectItem value="solo_mis_hijos">Solo mis hijos</SelectItem>
            <SelectItem value="mis_padres">Mis padres</SelectItem>
            <SelectItem value="otros">Otro(s)</SelectItem>
          </Select>
          {errors.protectWho && (
            <p className="text-red-500 text-sm mt-1">{errors.protectWho}</p>
          )}
        </div>

        {(formData.protectWho === "mi_pareja_y_yo" ||
          formData.protectWho === "mis_hijos_y_yo" ||
          formData.protectWho === "solo_yo" ||
          formData.protectWho === "familia") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yo tengo
            </label>
            <NumberInput
              name="age"
              placeholder="Ej: 18"
              value={formData.age}
              onValueChange={(value) => handleInputChange("age", value)}
              error={!!errors.age}
              errorMessage={errors.age}
              className="w-full"
              min={18}
              max={100}
            />
          </div>
        )}

        {(formData.protectWho === "mi_pareja_y_yo" ||
          formData.protectWho === "familia") && (
          <>
            <div>
              <label
                htmlFor="partnerGender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mi pareja es
              </label>
              <Select
                id="partnerGender"
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
              </Select>
              {errors.partnerGender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.partnerGender}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="partnerAge"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mi pareja tiene
              </label>
              <NumberInput
                id="partnerAge"
                name="partnerAge"
                placeholder="Edad"
                value={formData.partnerAge}
                onValueChange={(value) =>
                  handleInputChange("partnerAge", value)
                }
                error={!!errors.partnerAge}
                errorMessage={errors.partnerAge}
                className="w-full"
                min={18}
                max={100}
              />
            </div>
          </>
        )}

        {(formData.protectWho === "familia" ||
          formData.protectWho === "mis_hijos_y_yo" ||
          formData.protectWho === "solo_mis_hijos") && (
          <>
            <div className="col-span-2">
              <label
                htmlFor="childrenCount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de hijos
              </label>
              <NumberInput
                id="childrenCount"
                name="childrenCount"
                placeholder="Nº de hijos"
                value={formData.childrenCount}
                onValueChange={(value) =>
                  handleInputChange("childrenCount", value)
                }
                error={!!errors.childrenCount}
                errorMessage={errors.childrenCount}
                className="w-full"
                min={1}
                max={10}
              />
            </div>
            {formData.childrenCount && formData.childrenCount > 0 && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.childrenCount === 1
                    ? "Datos de mi hijo"
                    : `Datos de mis ${formData.childrenCount} hijos`}
                </label>
                <div className="space-y-4">
                  {Array.from({ length: formData.childrenCount }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <label
                            htmlFor={`childAge${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Edad
                          </label>
                          <NumberInput
                            id={`childAge${index}`}
                            name={`childAge${index}`}
                            placeholder="Edad"
                            value={formData.children?.[index]?.age ?? 0}
                            onValueChange={(value) =>
                              handleChildChange(index, "age", value)
                            }
                            error={!!errors[`children.${index}.age`]}
                            errorMessage={errors[`children.${index}.age`]}
                            className="w-full"
                            min={0}
                            max={25}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`childGender${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Género
                          </label>
                          <Select
                            id={`childGender${index}`}
                            name={`childGender${index}`}
                            placeholder="Seleccionar"
                            value={formData.children?.[index]?.gender ?? ""}
                            onValueChange={(value) =>
                              handleChildChange(index, "gender", value)
                            }
                            error={!!errors[`children.${index}.gender`]}
                          >
                            <SelectItem value="hombre">Hombre</SelectItem>
                            <SelectItem value="mujer">Mujer</SelectItem>
                          </Select>
                          {errors[`children.${index}.gender`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`children.${index}.gender`]}
                            </p>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {formData.protectWho === "otros" && (
          <>
            <div className="col-span-2">
              <label
                htmlFor="protectedCount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ¿Cuántas personas quieres asegurar?
              </label>
              <NumberInput
                id="protectedCount"
                name="protectedCount"
                placeholder="Nº de personas"
                value={formData.protectedCount}
                onValueChange={(value) =>
                  handleInputChange("protectedCount", value)
                }
                error={!!errors.protectedCount}
                errorMessage={errors.protectedCount}
                className="w-full"
                min={1}
                max={10}
              />
            </div>

            <div className="col-span-2">
              {formData.protectedCount && formData.protectedCount > 0 && (
                <div className="space-y-4">
                  {Array.from({ length: formData.protectedCount }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <label
                            htmlFor={`protectedRelationship${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Parentesco
                          </label>
                          <TextInput
                            id={`protectedRelationship${index}`}
                            name={`protectedRelationship${index}`}
                            placeholder="Ej: Hermano"
                            value={
                              formData.protectedPersons?.[index]
                                ?.relationship || ""
                            }
                            onChange={(e) =>
                              handleProtectedPersonChange(
                                index,
                                "relationship",
                                e.target.value,
                              )
                            }
                            error={
                              !!errors[`protectedPersons.${index}.relationship`]
                            }
                            errorMessage={
                              errors[`protectedPersons.${index}.relationship`]
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`protectedAge${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Edad
                          </label>
                          <NumberInput
                            id={`protectedAge${index}`}
                            name={`protectedAge${index}`}
                            placeholder="Edad"
                            value={formData.protectedPersons?.[index]?.age || 0}
                            onValueChange={(value) =>
                              handleProtectedPersonChange(index, "age", value)
                            }
                            error={!!errors[`protectedPersons.${index}.age`]}
                            errorMessage={
                              errors[`protectedPersons.${index}.age`]
                            }
                            className="w-full"
                            min={0}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`protectedGender${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Género
                          </label>
                          <Select
                            id={`protectedGender${index}`}
                            name={`protectedGender${index}`}
                            placeholder="Seleccionar"
                            value={
                              formData.protectedPersons?.[index]?.gender || ""
                            }
                            onValueChange={(value) =>
                              handleProtectedPersonChange(
                                index,
                                "gender",
                                value,
                              )
                            }
                            error={!!errors[`protectedPersons.${index}.gender`]}
                          >
                            <SelectItem value="hombre">Hombre</SelectItem>
                            <SelectItem value="mujer">Mujer</SelectItem>
                          </Select>
                          {errors[`protectedPersons.${index}.gender`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`protectedPersons.${index}.gender`]}
                            </p>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {formData.protectWho === "mis_padres" && (
          <>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de mamá
                </label>
                <TextInput
                  name="momName"
                  placeholder="Ej: María López"
                  value={formData.momName}
                  onChange={(e) => handleInputChange("momName", e.target.value)}
                  error={!!errors.momName}
                  errorMessage={errors.momName}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de papá
                </label>
                <TextInput
                  name="dadName"
                  placeholder="Ej: Juan Pérez"
                  value={formData.dadName}
                  onChange={(e) => handleInputChange("dadName", e.target.value)}
                  error={!!errors.dadName}
                  errorMessage={errors.dadName}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad de mamá
                </label>
                <NumberInput
                  name="momAge"
                  placeholder="Edad de mamá"
                  value={formData.momAge}
                  onValueChange={(value) => handleInputChange("momAge", value)}
                  error={!!errors.momAge}
                  errorMessage={errors.momAge}
                  className="w-full"
                  min={18}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad de papá
                </label>
                <NumberInput
                  name="dadAge"
                  placeholder="Edad de papá"
                  value={formData.dadAge}
                  onValueChange={(value) => handleInputChange("dadAge", value)}
                  error={!!errors.dadAge}
                  errorMessage={errors.dadAge}
                  className="w-full"
                  min={18}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
