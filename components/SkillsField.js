"use client";

import { useMemo, useState } from "react";
import { SKILLS, yearsLabel, projectsLabel } from "../lib/cinematic/skills";
import SkillMark from "./SkillMark";
import BackHub from "./BackHub";

function hash(id) {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return n / 997;
}

/**
 * Place skills in a ring around the globe, fully on-screen, never over the disc.
 * Left/right chips pin to their near edge so long labels grow inward.
 */
function ringSlot(i, total) {
  const a = hash(SKILLS[i].id);
  const b = hash(`${SKILLS[i].id}-b`);
  const leftCount = Math.ceil(total * 0.34);
  const rightCount = Math.ceil(total * 0.34);
  const topCount = Math.ceil(total * 0.16);
  const bottomStart = leftCount + rightCount + topCount;

  if (i < leftCount) {
    const t = i / Math.max(1, leftCount - 1);
    const left = 2.4 + a * 6.5;
    return {
      left,
      top: 20 + t * 54 + (b - 0.5) * 2,
      rot: (a - 0.5) * 8
    };
  }
  if (i < leftCount + rightCount) {
    const j = i - leftCount;
    const t = j / Math.max(1, rightCount - 1);
    const right = 2.4 + a * 6.5;
    return {
      right,
      left: 100 - right - 16,
      top: 20 + t * 54 + (b - 0.5) * 2,
      rot: (a - 0.5) * 8
    };
  }
  if (i < bottomStart) {
    const j = i - leftCount - rightCount;
    const t = j / Math.max(1, topCount - 1);
    return {
      left: 20 + t * 58 + (a - 0.5) * 2,
      top: 14.5 + b * 4,
      rot: (a - 0.5) * 5
    };
  }
  const j = i - bottomStart;
  const bottomCount = total - bottomStart;
  const t = j / Math.max(1, bottomCount - 1);
  return {
    left: 16 + t * 62 + (a - 0.5) * 2,
    top: 79 + b * 4.5,
    rot: (a - 0.5) * 5
  };
}

export default function SkillsField({ lang, copy, onBack }) {
  const [active, setActive] = useState(null);
  const layout = useMemo(
    () =>
      SKILLS.map((skill, i) => {
        const slot = ringSlot(i, SKILLS.length);
        return { ...skill, ...slot, delay: i * 40 };
      }),
    []
  );
  const selected = layout.find((s) => s.id === active);

  const toastLeft = selected ? Math.min(72, Math.max(4, selected.left > 50 ? selected.left - 18 : selected.left + 2)) : 0;
  const toastTop = selected ? Math.min(82, Math.max(18, selected.top + (selected.top > 70 ? -14 : 8))) : 0;

  return (
    <section className="skills-stage">
      <header className="gallery-head">
        <h2>{copy.skillsNav}</h2>
        <p className="skill-hint">{copy.skillHint}</p>
      </header>
      <BackHub label={copy.backHub} onBack={onBack} />
      <div className="skills-globe-clear" aria-hidden="true" />
      {layout.map((skill) => (
        <button
          key={skill.id}
          type="button"
          className={`skill-chip${active === skill.id ? " is-on" : ""}`}
          style={{
            left: skill.right == null ? `${skill.left}%` : undefined,
            right: skill.right != null ? `${skill.right}%` : undefined,
            top: `${skill.top}%`,
            transform: `rotate(${skill.rot}deg)`,
            animationDelay: `${skill.delay}ms`
          }}
          onClick={() => setActive(skill.id === active ? null : skill.id)}
        >
          <SkillMark icon={skill.icon} />
          <span>{skill.name[lang] || skill.name.en}</span>
        </button>
      ))}
      {selected ? (
        <div className="skill-toast" style={{ left: `${toastLeft}%`, top: `${toastTop}%` }}>
          <strong>{selected.name[lang] || selected.name.en}</strong>
          <p>{yearsLabel(selected.years, lang)}</p>
          <p>{projectsLabel(selected.projects, lang)}</p>
        </div>
      ) : null}
    </section>
  );
}
