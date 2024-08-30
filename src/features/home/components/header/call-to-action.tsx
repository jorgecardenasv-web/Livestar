import { TextInput } from "@tremor/react";

export const CallToAction = () => {
  return (
    <div className="backdrop-blur-sm bg-white/10 p-6 rounded-2xl shadow-lg w-full xl:w-auto text-left">
      <h2 className="text-4xl lg:text-5xl font-bold mb-1">Cotiza tu futuro</h2>
      <p className="mb-4 text-base">¡Descubre el precio más conveniente al momento!</p>
      <form className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="text-xl font-bold">
            Mi nombre es
          </label>
          <TextInput
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="cp" className="text-xl font-bold">
            Mi código postal es
          </label>
          <TextInput
            type="number"
            id="cp"
            name="cp"
            autoComplete="postal-code"
            placeholder=""
          />
        </div>
        <button
          type="submit"
          className="bg-white lg:w-5/6 mx-auto text-[#008AED] px-6 py-3 rounded-xl font-bold text-lg w-full"
        >
          ¡Ver mi precio ahora!
        </button>
      </form>
    </div>
  );
};
