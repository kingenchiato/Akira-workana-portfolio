"use client";

import FlagIcon from "./FlagIcon";

export default function SpaceHub({ copy, lang, pins, onPick }) {
  return (
    <div className="hub-layer">
      <p className="hub-lead">{copy.hubLead}</p>
      <button type="button" className="hub-orb hub-orb-about" onClick={() => onPick("about")}>
        <em>01</em>
        <strong>{copy.aboutMe}</strong>
      </button>
      <button type="button" className="hub-orb hub-orb-japan" onClick={() => onPick("japan")}>
        <em>02</em>
        <strong>{copy.japanProjects}</strong>
      </button>
      <button type="button" className="hub-orb hub-orb-world" onClick={() => onPick("world")}>
        <em>03</em>
        <strong>{copy.worldProjects}</strong>
      </button>
      <button type="button" className="hub-orb hub-orb-skills" onClick={() => onPick("skills")}>
        <em>04</em>
        <strong>{copy.skillsNav}</strong>
      </button>
      {pins.map((pin) => (
        <div
          key={pin.id}
          className={`globe-pin${pin.visible ? " is-on" : ""}`}
          style={{ left: pin.x, top: pin.y }}
        >
          <span className="globe-pin-flag">
            <FlagIcon code={pin.flag} />
          </span>
          <span>{pin.name[lang] || pin.name.en}</span>
        </div>
      ))}
    </div>
  );
}
