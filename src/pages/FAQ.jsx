import React from "react";
import { useAuth } from "../context/AuthContext";

const FAQ = () => {
  const { language } = useAuth();

  const faq = {
    fr: [
      { q: "Qu’est-ce qu’EcoAgriConnect ?", a: "EcoAgriConnect est une plateforme qui met en relation les agriculteurs, acheteurs, prestataires et conseillers pour faciliter la production, la vente et l’accès aux services agricoles." },
      { q: "Comment créer un compte ?", a: "Clique sur Créer un compte, choisis ton type d’utilisateur (Agriculteur, Acheteur, Prestataire, Conseiller), puis remplis tes informations." },
      { q: "Comment se connecter ?", a: "Rends-toi sur la page Connexion, entre ton email et ton mot de passe, puis clique sur Se connecter." },
      { q: "Je ne retrouve pas mon mot de passe, que faire ?", a: "Pour le moment, la récupération de mot de passe n’est pas disponible. Tu peux contacter le support via : contact@ecoagriconnectsolutions.com" },
      { q: "Comment publier un produit ou une culture ?", a: "Après connexion, va dans Marketplace ou Cultures, puis clique sur Ajouter." },
      { q: "Comment contacter un conseiller agricole ?", a: "Tu peux envoyer un message via la section Messages ou utiliser les coordonnées disponibles dans le footer." },
      { q: "Qu’est-ce que la géolocalisation ?", a: "La géolocalisation permet d’afficher les produits et services proches de toi, selon ta position." },
      { q: "Les données sont-elles sécurisées ?", a: "Oui, vos données sont stockées localement pour le moment. À l’avenir, nous utiliserons une base de données sécurisée côté serveur." },
      { q: "Comment changer mon type d’utilisateur ?", a: "Pour changer de type, il faut créer un nouveau compte avec le rôle souhaité." },
      { q: "Puis-je utiliser l’application sans connexion internet ?", a: "Partiellement. Tu peux consulter certaines informations déjà chargées, mais la plupart des fonctionnalités nécessitent une connexion internet." },
      { q: "Comment supprimer mon compte ?", a: "Pour supprimer ton compte, contacte le support à contact@ecoagriconnectsolutions.com." },
      { q: "Comment modifier mes informations personnelles ?", a: "Va dans Profil, puis clique sur Modifier pour mettre à jour tes informations." },
      { q: "Comment signaler un utilisateur ou un contenu ?", a: "Dans le profil de l’utilisateur ou sur le contenu, clique sur Signaler et explique le problème." },
      { q: "Comment recevoir des notifications ?", a: "Active les notifications dans Paramètres, puis autorise les notifications sur ton téléphone." },
      { q: "Comment fonctionne la messagerie ?", a: "Après connexion, va dans Messages, choisis un utilisateur, puis envoie ton message." },
    ],
    en: [
      { q: "What is EcoAgriConnect?", a: "EcoAgriConnect is a platform that connects farmers, buyers, service providers, and advisors to facilitate production, sales, and access to agricultural services." },
      { q: "How do I create an account?", a: "Click Create Account, choose your user type (Farmer, Buyer, Service Provider, Advisor), then fill in your information." },
      { q: "How do I log in?", a: "Go to the Login page, enter your email and password, then click Log in." },
      { q: "I forgot my password, what should I do?", a: "Password recovery is not available yet. You can contact support at contact@ecoagriconnectsolutions.com" },
      { q: "How do I post a product or crop?", a: "After logging in, go to Marketplace or Crops, then click Add." },
      { q: "How can I contact an agricultural advisor?", a: "You can send a message through the Messages section or use the contact details in the footer." },
      { q: "What is geolocation?", a: "Geolocation allows you to display products and services near you based on your location." },
      { q: "Are my data secure?", a: "Yes, your data is stored locally for now. In the future, we will use a secure server database." },
      { q: "How do I change my user type?", a: "To change your user type, you must create a new account with the desired role." },
      { q: "Can I use the app without internet?", a: "Partially. You can view some already loaded information, but most features require an internet connection." },
      { q: "How do I delete my account?", a: "To delete your account, contact support at contact@ecoagriconnectsolutions.com." },
      { q: "How do I edit my profile?", a: "Go to Profile, then click Edit to update your information." },
      { q: "How do I report a user or content?", a: "In the user profile or on the content, click Report and explain the issue." },
      { q: "How do I receive notifications?", a: "Enable notifications in Settings, then allow notifications on your device." },
      { q: "How does messaging work?", a: "After logging in, go to Messages, choose a user, then send your message." },
    ]
  };

  const selectedFaq = faq[language] || faq.fr;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">FAQ</h2>
      {selectedFaq.map((item, index) => (
        <div key={index} className="mb-3">
          <h5 className="fw-bold">{item.q}</h5>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
