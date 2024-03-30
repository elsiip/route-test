import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../assets/css/styles.module.css";
import { useState } from 'react';

const article = {
  title: {
    id: "Buat Produk",
    en: "Create Product"
  },
  description: {
    id: "Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.",
    en: "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it."
  }
};

export default function Header() {
  const [language, setLanguage] = useState('id'); // Default language is Indonesian

  const getLanguageText = (key) => {
    // Return the text based on the selected language or fallback to Indonesian if not available
    return article[key][language] || article[key]['id'];
  };

  const toggleLanguage = () => {
    // Toggle between English and Indonesian
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return(
    <div>
      <button type="button" className="btn btn-secondary" onClick={toggleLanguage}>
            {language === 'id' ? 'English' : 'Indonesian'}
      </button>
      <div className="col-xl-12 text-center">
        <div className="btn-group" role="group" aria-label="Language">
        </div>
        <img src="https://brandlogos.net/wp-content/uploads/2021/09/bootstrap-logo.png" alt="Logo" width="auto" height="57px" />
      </div>
      <div className="font col-xl-12 text-center">
        <h1 className="font-weight-medium">{getLanguageText('title')}</h1>
        <p className="font-weight-light color-primary">{getLanguageText('description')}</p>
      </div>
    </div>  
  )
}
