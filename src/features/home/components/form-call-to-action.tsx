import React from "react";
import { Button, TextInput } from "@tremor/react";

export const FormCallToAction = () => {
  return (
    <form className="space-y-12 w-full">
      <div className="space-y-16">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-[#008AED] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Datos Personales</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Mi nombre es</label>
              <TextInput className="flex-grow" placeholder="" />
              <label className="text-sm text-gray-600">, Tengo</label>
              <TextInput className="w-20" placeholder="" />
              <label className="text-sm text-gray-600">años</label>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Soy</label>
              <TextInput className="w-40" placeholder="" />
              <label className="text-sm text-gray-600">
                , Mi código postal es
              </label>
              <TextInput className="w-32" placeholder="" />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Quiero proteger a</label>
              <TextInput className="flex-grow" placeholder="" />
              <label className="text-sm text-gray-600">Mi pareja es</label>
              <TextInput className="w-40" placeholder="" />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Mi pareja tiene</label>
              <TextInput className="w-20" placeholder="" />
              <label className="text-sm text-gray-600">años, y mis</label>
              <TextInput className="w-20" placeholder="" />
              <label className="text-sm text-gray-600">
                hijos que tengo tienen
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <TextInput className="w-20" placeholder="" />
              <label className="text-sm text-gray-600">y</label>
              <TextInput className="w-20" placeholder="" />
              <label className="text-sm text-gray-600">años.</label>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-[#008AED] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Datos de contacto</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Mi whatsapp es</label>
              <TextInput className="flex-grow" placeholder="" />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Mi correo es</label>
              <TextInput className="flex-grow" placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <Button className="bg-[#008AED] text-white px-6 py-3 rounded-lg font-bold text-lg w-full mt-6">
        Cotizar
      </Button>
    </form>
  );
};
