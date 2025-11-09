import { useState } from "react";

const App = () => {
  const [color, setColor] = useState("#969696");
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
    setColor("#969696");
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
      className="w-10/12 mx-auto h-[100vh] bg- flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div className="w-64 h-auto py-10">
        <select
          className="border border-black rounded-xl mb-5 py-3 px-5 outline-none"
          value={colorType}
          onChange={handleColorTypeChange}
        >
          <option value="HEX">HEX</option>
          <option value="RGB">REG</option>
        </select>

        <div className="flex gap-3 mb-5">
          <p className="border rounded-xl border-black px-3 py-2 text-white">
            {color}
          </p>

          <button
            className="text-white px-4 p-2 rounded-2xl bg-green-800"
            onClick={handleCopyColor}
          >
            {copyied}
          </button>
        </div>

        <div className="flex gap-5">
          <button
            onClick={handleColorChange}
            className="text-white px-4 p-2 rounded-2xl bg-green-800"
          >
            Color Change
          </button>
          <button
            onClick={handleColorReset}
            className="text-white px-4 p-2 rounded-2xl bg-green-800"
          >
            Reset Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
