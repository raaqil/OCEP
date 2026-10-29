import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Globe2,
  Heart,
  Lightbulb,
  Menu,
  MessageCircle,
  MessagesSquare,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import './styles.css';

const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Activities', 'activities'],
  ['Gallery', 'gallery'],
  ['Experiences', 'experiences'],
  ['Contact', 'contact'],
];
const benefits = [
  {
    icon: Users,
    title: 'Global Friendships',
    text: 'Meet, connect, and learn with students from Indonesia and Japan.',
    color: 'red',
  },
  {
    icon: MessagesSquare,
    title: 'Practical English Skills',
    text: 'Find your voice through real conversations and shared ideas.',
    color: 'blue',
  },
  {
    icon: Lightbulb,
    title: 'Cultural Understanding',
    text: 'Discover each other’s cultures, everyday lives, and perspectives.',
    color: 'red',
  },
  {
    icon: TrendingUp,
    title: 'Personal Growth',
    text: 'Build confidence, stay curious, and see the world a little differently.',
    color: 'blue',
  },
];
const activities = [
  {
    icon: MessagesSquare,
    title: 'English Conversation',
    text: 'Small conversations. A world of possibilities. Practice everyday English in a welcoming space.',
    image: '/assets/conversation.jpg',
    tag: 'LET’S TALK',
    color: 'red',
  },
  {
    icon: Globe2,
    title: 'Cultural Exchange',
    text: 'From favorite foods to local traditions, discover the stories that make our cultures unique.',
    image: '/assets/culture.jpg',
    tag: 'SHARE YOUR WORLD',
    color: 'blue',
  },
  {
    icon: Lightbulb,
    title: 'Group Discussions',
    text: 'Explore new topics, share your perspective, and learn to see things through another lens.',
    image: '/assets/discussion.jpg',
    tag: 'IDEAS WITHOUT BORDERS',
    color: 'red',
  },
  {
    icon: Users,
    title: 'Friendship & Collaboration',
    text: 'Learn with each other, encourage one another, and turn a new connection into a friendship.',
    image: '/assets/friendship.jpg',
    tag: 'BETTER TOGETHER',
    color: 'blue',
  },
];
const questions = [
  [
    'What is OCEP?',
    'OCEP is a collaborative English learning and cultural exchange activity connecting students from Universitas Budi Luhur, Indonesia, with participants from Japan. It is a space to learn together through conversation and connection.',
  ],
  [
    'Do I need to be fluent in English?',
    'OCEP is about practicing and building confidence together. You do not need perfect English to start a conversation. Details about participation requirements will be shared through official OCEP information when available.',
  ],
  [
    'What can we learn together?',
    'The learning concepts include everyday English conversations, cultural exchange, group discussions, and friendship through collaboration. Specific activities will depend on the program information provided by the organizers.',
  ],
  [
    'Who is OCEP for?',
    'OCEP brings together university students from Universitas Budi Luhur and participants from Japan who are interested in practicing English and getting to know another culture.',
  ],
  [
    'How are the sessions conducted?',
    'OCEP centers on direct interaction, shared conversations, and collaborative learning. Confirmed session formats and schedules will be added once the organizers provide them.',
  ],
  [
    'How can I take part?',
    'Official participation details and contact channels have not been provided yet. This website will be updated with information from the OCEP organizers when it becomes available.',
  ],
];

function Logo({ footer = false }) {
  return (
    <a className={`logo ${footer ? 'footer-logo' : ''}`} href="#home" aria-label="OCEP home">
      <img src="./favicon.svg" alt="" width="43" height="43" />
      <strong>OCEP</strong>
      <span>
        One Classroom
        <br />
        Bigger World
      </span>
    </a>
  );
}

function Button({ children, href, variant = 'primary', onClick, className = '' }) {
  const classes = `button button-${variant} ${className}`;
  return href ? (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, link, href }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        <span className="heading-line" />
      </div>
      {link && (
        <a className="text-link" href={href}>
          {link}
          <ArrowRight size={15} />
        </a>
      )}
    </div>
  );
}

function Blossom({ className = '' }) {
  return (
    <span className={`blossom ${className}`} aria-hidden="true">
      ✿
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [overview, setOverview] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const [filter, setFilter] = useState('All moments');
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const modalOpen = overview || galleryIndex !== null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: '-15% 0px -65% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOverview(false);
        setGalleryIndex(null);
      }
      if (event.key === 'Tab') {
        const elements = dialog.current?.querySelectorAll('button, a[href]');
        if (!elements?.length) return;
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (galleryIndex !== null && event.key === 'ArrowRight')
        setGalleryIndex((index) => (index + 1) % activities.length);
      if (galleryIndex !== null && event.key === 'ArrowLeft')
        setGalleryIndex((index) => (index + activities.length - 1) % activities.length);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [modalOpen, galleryIndex]);

  const filteredActivities = filter === 'All moments' ? activities : activities.filter((item) => item.title === filter);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-shell container">
          <Logo />
          <nav
            id="main-navigation"
            className={menuOpen ? 'navigation is-open' : 'navigation'}
            aria-label="Main navigation"
          >
            {navigation.map(([label, id]) => (
              <a
                key={id}
                className={active === id ? 'active' : ''}
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="button button-primary nav-cta" href="#contact">
            Let’s Connect <ArrowRight size={16} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero">
          <div className="hero-wash" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="flag flag-id" />
                <span>INDONESIA</span>
                <span className="cross">×</span>
                <span>JAPAN</span>
                <span className="flag flag-jp" />
                <span className="eyebrow-separator" />A BRIGHTER TOMORROW
              </div>
              <h1>
                Learn English.
                <br />
                <span>Build Friendships.</span>
                <br />
                Bridge Cultures.
              </h1>
              <p className="hero-description">
                One classroom. Two cultures. Countless connections.
                <br className="desktop-break" /> A welcoming space for students from Indonesia and Japan to learn,
                share, and grow together.
              </p>
              <div className="hero-buttons">
                <Button href="#about">
                  Explore OCEP <ArrowRight size={17} />
                </Button>
                <Button variant="outline" onClick={() => setOverview(true)}>
                  <CirclePlay size={19} fill="currentColor" stroke="white" /> Meet OCEP
                </Button>
              </div>
              <div className="hero-values">
                <span>
                  <Users />
                  <span>
                    Real Global
                    <br />
                    Friendships
                  </span>
                </span>
                <span>
                  <MessagesSquare />
                  <span>
                    Meaningful
                    <br />
                    Conversations
                  </span>
                </span>
                <span>
                  <Globe2 />
                  <span>
                    Cultural Exchange
                    <br />
                    Experiences
                  </span>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                className="hero-image"
                src="./assets/ocep-hero.webp"
                alt="Concept illustration of Indonesian and Japanese students sharing a conversation around a laptop, with Jakarta and Japanese landmarks"
                width="1536"
                height="1024"
                fetchPriority="high"
              />
              <div className="handwritten hero-note">
                Different backgrounds.
                <br />
                <span>Same dreams.</span>
                <Heart size={19} fill="currentColor" />
              </div>
              <div className="speech speech-id">
                <span className="flag flag-id" />
                <span>
                  Nice to
                  <br />
                  <strong>meet you!</strong>
                </span>
              </div>
              <div className="speech speech-jp">
                <span>
                  よろしく
                  <br />
                  <strong>お願いします!</strong>
                </span>
                <span className="flag flag-jp" />
              </div>
              <div className="little-note">
                <span>New friends.</span>
                <span>New perspectives.</span>
                <strong>
                  A bigger world. <Heart size={13} />
                </strong>
              </div>
              <span className="illustration-credit">An illustration of the connections we imagine.</span>
            </div>
          </div>
        </section>

        <section id="about" className="about section-space">
          <Blossom className="flower-left" />
          <Blossom className="flower-right" />
          <div className="container">
            <div className="reveal">
              <SectionHeading
                title="A Little English. A World of Connection."
                link="Get to know OCEP"
                href="#our-story"
              />
              <div className="benefits-grid">
                {benefits.map(({ icon: Icon, title, text, color }) => (
                  <article className="benefit-card" key={title}>
                    <span className={`icon-disc ${color}`}>
                      <Icon size={27} strokeWidth={2} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div id="our-story" className="story-strip reveal">
              <span className="story-icon">
                <BookOpen size={25} />
              </span>
              <p>
                <strong>More than an English class. A shared learning experience.</strong> OCEP connects students from
                Universitas Budi Luhur with participants from Japan. Through conversation, collaboration, and cultural
                exchange, we learn with each other—and from each other.
              </p>
              <span className="story-flags">
                <span className="flag flag-id" />
                <Heart size={15} />
                <span className="flag flag-jp" />
              </span>
            </div>
            <div className="how-it-works reveal">
              <SectionHeading title="How We Grow Together" link="Explore the activities" href="#activities" />
              <div className="steps-grid">
                {[
                  {
                    title: 'Say Hello',
                    text: 'Start with a little curiosity and a friendly introduction.',
                    icon: MessageCircle,
                  },
                  {
                    title: 'Make a Connection',
                    text: 'Meet people with different backgrounds and shared interests.',
                    icon: Users,
                  },
                  {
                    title: 'Learn & Share',
                    text: 'Practice English, exchange stories, and explore new ideas.',
                    icon: MessagesSquare,
                  },
                  {
                    title: 'Grow Together',
                    text: 'Build confidence, broaden your perspective, and find your people.',
                    icon: Sparkles,
                  },
                ].map(({ title, text, icon: Icon }, index) => (
                  <article className="step" key={title}>
                    <div className="step-top">
                      <span className={`step-number ${index % 2 ? 'blue' : 'red'}`}>0{index + 1}</span>
                      <span className={`icon-disc ${index % 2 ? 'blue' : 'red'}`}>
                        <Icon size={25} />
                      </span>
                      {index < 3 && <ArrowRight className="step-arrow" size={19} />}
                    </div>
                    <div className="step-text">
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="activities" className="activities section-space">
          <div className="container reveal">
            <SectionHeading
              eyebrow="LEARNING HAPPENS BETWEEN PEOPLE"
              title="Conversations That Bring Us Closer"
              link="See the gallery"
              href="#gallery"
            />
            <div className="activities-grid">
              {activities.map(({ icon: Icon, title, text, image, tag, color }) => (
                <article className="activity-card" key={title}>
                  <div className="activity-image">
                    <img
                      src={`.${image}`}
                      alt={`Illustrative stock photograph for ${title.toLowerCase()}`}
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                    <span className="image-label">Illustrative photo</span>
                    <span className={`activity-icon icon-disc ${color}`}>
                      <Icon size={21} />
                    </span>
                  </div>
                  <div className="activity-body">
                    <span className="activity-tag">{tag}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a href="#gallery" aria-label={`Explore ${title} in the gallery`}>
                      Explore the possibilities <ArrowUpRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="content-note">
              A glimpse of what learning together can look like. Activity concepts and illustrative photos; confirmed
              program details will be shared by the organizers.
            </p>
          </div>
        </section>

        <section id="gallery" className="gallery section-space">
          <Blossom className="gallery-flower" />
          <div className="container reveal">
            <SectionHeading eyebrow="LITTLE MOMENTS, LASTING CONNECTIONS" title="Our World, In Moments" />
            <div className="gallery-intro">
              <p>
                A place for the conversations, discoveries, and smiles we’ll share.
                <br />
                Our OCEP photo story is waiting to be written.
              </p>
              <span className="upcoming-pill">
                <span /> Photo stories coming soon
              </span>
            </div>
            <div className="gallery-filters" role="group" aria-label="Filter gallery concepts">
              {['All moments', 'English Conversation', 'Cultural Exchange', 'Friendship & Collaboration'].map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    className={filter === item ? 'selected' : ''}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item === 'English Conversation'
                      ? 'Conversations'
                      : item === 'Friendship & Collaboration'
                        ? 'Friendships'
                        : item}
                  </button>
                ),
              )}
            </div>
            <div className="gallery-grid">
              {filteredActivities.map((item) => (
                <button
                  type="button"
                  className="gallery-card"
                  key={item.title}
                  onClick={() => setGalleryIndex(activities.indexOf(item))}
                  aria-label={`Preview ${item.title} photo concept`}
                >
                  <img
                    src={`.${item.image}`}
                    alt={`Illustrative photo concept: ${item.title}`}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="gallery-overlay">
                    <span>PHOTO CONCEPT</span>
                    <h3>{item.title}</h3>
                  </div>
                  <span className="gallery-expand">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
              ))}
            </div>
            <p className="content-note">
              <Camera size={14} /> These are visual placeholders, not photographs of OCEP events. Original documentation
              will take their place.
            </p>
          </div>
        </section>

        <section id="experiences" className="experiences section-space">
          <div className="container reveal">
            <SectionHeading
              eyebrow="EVERY CONNECTION HAS A STORY"
              title="A Space for Your Stories"
              link="Get in touch"
              href="#contact"
            />
            <div className="stories-grid">
              {[
                {
                  title: 'My first conversation',
                  text: 'That moment when a simple “hello” opens up a whole new world.',
                  icon: MessageCircle,
                  label: 'CONFIDENCE & CONNECTION',
                },
                {
                  title: 'A new way to see the world',
                  text: 'The little discoveries that help us understand one another better.',
                  icon: Globe2,
                  label: 'CULTURE & CURIOSITY',
                },
                {
                  title: 'From strangers to friends',
                  text: 'The people and shared moments that make learning meaningful.',
                  icon: Heart,
                  label: 'FRIENDSHIP & BELONGING',
                },
              ].map(({ title, text, icon: Icon, label }) => (
                <article className="story-card" key={title}>
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  <span className="story-theme">{label}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="story-placeholder">
                    <span className="icon-disc">
                      <Icon size={19} />
                    </span>
                    <span>
                      <strong>Your story belongs here</strong>
                      <small>Participant experiences coming soon</small>
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <p className="content-note">
              Story prompts, not participant testimonials. Real experiences will be published when provided with
              permission.
            </p>
          </div>
        </section>

        <section className="partners">
          <div className="container reveal">
            <SectionHeading title="Connected by a Shared Curiosity" />
            <div className="partner-row">
              <div className="university">
                <img className="university-seal" src="./assets/budi_luhur.png" alt="Logo Universitas Budi Luhur" width="62" height="62" loading="lazy" />
                <div>
                  <small>UNIVERSITAS</small>
                  <strong>BUDI LUHUR</strong>
                  <span>Indonesia</span>
                </div>
              </div>
              <span className="partner-connection">
                <span />
                <Heart size={19} />
                <span />
              </span>
              <div className="japan-partner">
                <span className="sakura-emblem" aria-hidden="true">
                  ✿
                </span>
                <div>
                  <strong>日本の仲間たち</strong>
                  <span>Our learning friends in Japan</span>
                  <small>Across cultures. Together in English.</small>
                </div>
              </div>
            </div>
            <p className="partner-note">
              A community connecting Universitas Budi Luhur students and participants from Japan.
            </p>
          </div>
        </section>

        <section className="journey-banner">
          <div className="container journey-layout">
            <div>
              <span className="eyebrow">DIFFERENT BACKGROUNDS. SHARED CURIOSITY.</span>
              <h2>
                Two Cultures.
                <br />
                One Learning Journey.
              </h2>
              <p>
                A little courage. A new conversation.
                <br />A brighter, more connected tomorrow.
              </p>
            </div>
            <div className="journey-art">
              <img src="./assets/ocep-hero.webp" alt="" loading="lazy" width="1536" height="1024" />
            </div>
            <span className="handwritten journey-note">
              More than a class.
              <br />A global friendship.
            </span>
          </div>
        </section>

        <section id="faq" className="faq section-space">
          <div className="container reveal">
            <SectionHeading title="A Few Things You Might Be Wondering" link="Still curious?" href="#contact" />
            <div className="faq-grid">
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <Plus size={17} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-scenery" aria-hidden="true" />
          <div className="container contact-inner">
            <span className="contact-eyebrow">A SMALL HELLO CAN BE THE START OF SOMETHING BIG.</span>
            <h2>Be Part of a More Connected Tomorrow.</h2>
            <p>Get to know OCEP. Discover a new culture. Find your voice in English.</p>
            <Button variant="white" onClick={() => setOverview(true)}>
              Let’s Get to Know OCEP <ArrowRight size={17} />
            </Button>
            <span className="contact-note">
              Official contact and participation information will be added here soon.
            </span>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-main">
          <div className="footer-about">
            <Logo footer />
            <p>A shared learning space connecting Indonesia and Japan through English, curiosity, and friendship.</p>
          </div>
          <div className="footer-links">
            <h3>Explore OCEP</h3>
            <a href="#about">Our story</a>
            <a href="#activities">Activities</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="footer-links">
            <h3>Stay Connected</h3>
            <a href="#experiences">Experiences</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact information</a>
          </div>
          <div className="footer-message">
            <span className="flag flag-id" />
            <Heart size={15} />
            <span className="flag flag-jp" />
            <p className="handwritten">
              Different cultures.
              <br />
              Brighter tomorrows.
            </p>
            <span className="red-scribble" />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>© {new Date().getFullYear()} OCEP. One Classroom, Bigger World.</p>
            <p>
              Made for connection. <span>Indonesia × Japan</span>
            </p>
          </div>
        </div>
      </footer>

      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOverview(false);
              setGalleryIndex(null);
            }
          }}
        >
          <div
            ref={dialog}
            className={`modal ${galleryIndex !== null ? 'gallery-modal' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              ref={closeButton}
              className="modal-close"
              type="button"
              aria-label="Close dialog"
              onClick={() => {
                setOverview(false);
                setGalleryIndex(null);
              }}
            >
              <X size={22} />
            </button>
            {galleryIndex !== null ? (
              <>
                <img
                  src={`.${activities[galleryIndex].image}`}
                  alt={`Illustrative concept for ${activities[galleryIndex].title}`}
                />
                <div className="gallery-modal-caption">
                  <div>
                    <span className="eyebrow">
                      ILLUSTRATIVE PHOTO · {galleryIndex + 1} / {activities.length}
                    </span>
                    <h2 id="modal-title">{activities[galleryIndex].title}</h2>
                    <p>This photo is a visual placeholder, not documentation of an OCEP event.</p>
                  </div>
                  <div className="gallery-controls">
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={() => setGalleryIndex((galleryIndex + activities.length - 1) % activities.length)}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={() => setGalleryIndex((galleryIndex + 1) % activities.length)}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="icon-disc red">
                  <Globe2 size={30} />
                </span>
                <span className="eyebrow">ONE CLASSROOM, BIGGER WORLD</span>
                <h2 id="modal-title">It starts with a conversation.</h2>
                <p>
                  OCEP brings together students from Universitas Budi Luhur, Indonesia, and participants from Japan to
                  practice English, share cultures, and build meaningful connections.
                </p>
                <ul>
                  {[
                    'Practice English through conversation',
                    'Learn about life in another culture',
                    'Build confidence and international friendships',
                  ].map((text) => (
                    <li key={text}>
                      <Check size={17} />
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="modal-info">
                  <Send size={19} />
                  <p>
                    Official schedules, contact channels, and participation details will be shared when provided by the
                    OCEP organizers.
                  </p>
                </div>
                <Button href="#activities" onClick={() => setOverview(false)} className="modal-explore">
                  Discover our activities
                  <ArrowRight size={17} />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
