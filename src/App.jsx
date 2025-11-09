import { useState } from "react";

const App = () => {
  const [color, setColor] = useState("#257e4b");
  const [colorType, setColorType] = useState("HEX");
  const [copyied, setCopied] = useState("Copy");

  const handleColorChange = () => {
    if (colorType === "HEX") {
      const randomNumber = Math.floor(Math.random() * 16777215);
      const hexColor = "#" + randomNumber.toString(16).padStart(6, "0");
      setColor(hexColor);
    } else {
      const r = parseInt(Math.floor(Math.random() * 256));
      const g = parseInt(Math.floor(Math.random() * 256));
      const b = parseInt(Math.floor(Math.random() * 256));
      setColor(`rgb(${r}, ${g}, ${b})`);
    }
  };

  const handleColorTypeChange = (e) => {
    const selectValue = e.target.value;
    setColorType(selectValue);

    if (selectValue === "RGB" && color.startsWith("#")) {
      const colorNumber = color.replace("#", "");
      const r = parseInt(colorNumber.substring(0, 2), 16);
      const g = parseInt(colorNumber.substring(2, 4), 16);
      const b = parseInt(colorNumber.substring(4, 6), 16);
      setColor(`rgb(${r},${g},${b})`);
    } else if (selectValue === "HEX" && color.startsWith("rgb")) {
      const [r, g, b] = color.match(/\d+/g).map(Number);
      const toHex = (val) => val.toString(16).padStart(2, "0");
      const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      setColor(hex);
    }
  };

  const handleColorReset = () => {
    setColor("#257e4b");
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color);
    setCopied("Copyied!");
    setTimeout(() => {
      setCopied("Copy");
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all duration-300"
      style={{ backgroundColor: color }}
    >
      <div className="w-80 bg-white/10 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Select Box */}
        <select
          className="w-full mb-6 py-3 px-5 rounded-xl bg-black/40 text-white font-semibold outline-none border border-white/30"
          value={colorType}
          onChange={handleColorTypeChange}
        >
          <option className="text-black" value="HEX">
            HEX
          </option>
          <option className="text-black" value="RGB">
            RGB
          </option>
        </select>

        {/* Color + Copy */}
        <div className="flex items-center justify-between mb-6">
          <p className="bg-black/50 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/30">
            {color}
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition"
            onClick={handleCopyColor}
          >
            {copyied}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 justify-center">
          <button
            onClick={handleColorChange}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition"
          >
            Change
          </button>

          <button
            onClick={handleColorReset}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
