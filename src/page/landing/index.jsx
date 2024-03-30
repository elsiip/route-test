import Navbar from '../../components/navbar';
import HeroSection from './hero-section'
import Carousel from './carousel'
import Footer from './footer'
import styles from "../../assets/css/styles.module.css";

export default function LandingPage() {
  return (
    <div className={styles['body']}>
      <Navbar/>
      <HeroSection/>
      <Carousel/>
      <Footer/>
    </div>
  );
}