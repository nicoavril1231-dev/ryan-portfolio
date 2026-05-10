import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/projects";
import { ScrollProgress } from "@/components/scroll-progress";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";

// Page d'accueil — composition pure. Toute la donnée vit dans /data,
// toutes les classes/animations dans les composants.
//
// `md:pl-16` réserve la largeur de la sidebar (w-16) sans subir l'expansion
// hover (w-52 → overlay au-dessus, pas de layout shift). Sur mobile la nav
// est en bas (pill), donc on ajoute pb-24 pour ne pas masquer le contenu.
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <div className="md:pl-16">
        <main className="relative pb-24 md:pb-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
