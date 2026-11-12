import { ABOUT } from "./cinematic/about";
import { SKILLS, yearsLabel } from "./cinematic/skills";
import { REVIEWS } from "./cinematic/reviews";
import { previewWorks } from "./catalog";
import { siteCopy } from "./siteCopy";

export function homeData() {
  const copy = siteCopy("en");
  const profile = ABOUT.en;
  return {
    hero: {
      kicker: copy.heroKicker,
      name: copy.heroName,
      sub: copy.heroSub,
      role: copy.heroRole,
      body: copy.heroBody,
      pills: copy.pills
    },
    profile: {
      kicker: copy.aboutKicker,
      title: copy.aboutTitle,
      lead: copy.aboutLead,
      more: copy.aboutMore,
      pills: copy.aboutPills,
      stats: copy.stats,
      approachKicker: copy.approachKicker,
      approach: copy.approach,
      paragraphs: profile.paragraphs,
      workTitle: profile.workTitle,
      workRole: profile.workRole,
      workCompany: profile.workCompany,
      workDates: profile.workDates,
      workBody: profile.workBody,
      langTitle: profile.langTitle,
      langs: profile.langs
    },
    journey: {
      kicker: copy.journeyKicker,
      title: copy.journeyTitle,
      lead: copy.journeyLead,
      items: copy.journey
    },
    skills: {
      kicker: copy.skillsKicker,
      title: copy.skillsTitle,
      lead: copy.skillsLead,
      note: copy.skillsNote,
      items: SKILLS.map((skill) => ({
        id: skill.id,
        name: skill.name.en,
        years: skill.years,
        label: yearsLabel(skill.years, "en")
      }))
    },
    services: {
      kicker: copy.servicesKicker,
      title: copy.servicesTitle,
      items: copy.services
    },
    faq: {
      kicker: copy.faqKicker,
      title: copy.faqTitle,
      aside: copy.faqAside,
      items: copy.faq
    },
    contact: {
      kicker: copy.contactKicker,
      title: copy.contactTitle,
      body: copy.contactBody,
      chips: copy.contactChips,
      form: copy.form
    },
    footer: {
      blurb: copy.footerBlurb,
      rights: copy.rights
    },
    voices: {
      kicker: copy.voicesKicker,
      title: copy.voicesTitle,
      lead: copy.voicesLead
    },
    projects: {
      kicker: copy.projectsKicker,
      title: copy.projectsTitle,
      lead: copy.projectsLead
    },
    reviews: REVIEWS.map((review) => ({
      id: review.id,
      name: review.name,
      face: review.face,
      photo: review.face,
      flag: review.flag,
      country: review.country,
      quote: review.quote.en,
      project: review.project.en,
      ago: review.ago.en,
      price: review.price,
      posted: review.engagement.posted,
      entrusted: review.engagement.entrusted,
      completed: review.engagement.completed
    })),
    preview: previewWorks()
  };
}
