import React from 'react';

const LAST_UPDATE = '14 mai 2026';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-gray-300 leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

const RGPD = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* En-tête */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-2">Dernière mise à jour : {LAST_UPDATE}</p>
          <h1 className="text-4xl font-bold text-white mb-4">Politique de confidentialité</h1>
          <p className="text-gray-400 text-base">
            Cette politique de confidentialité décrit la manière dont NenaaPic collecte,
            utilise et protège vos données personnelles conformément au Règlement Général
            sur la Protection des Données (RGPD — Règlement UE 2016/679).
          </p>
        </div>

        {/* 1. Responsable du traitement */}
        <Section title="1. Responsable du traitement">
          <p>
            <strong className="text-white">NenaaPic</strong> — Photographe indépendante<br />
            Nice, France<br />
            <a
              href="mailto:nenaapic@gmail.com"
              className="text-gray-300 underline hover:text-white transition-colors"
            >
              nenaapic@gmail.com
            </a>
          </p>
        </Section>

        {/* 2. Données collectées */}
        <Section title="2. Données collectées">
          <p>
            Les données suivantes peuvent être collectées lors de votre utilisation du site :
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
            <li>
              <strong className="text-white">Formulaire de contact :</strong> nom, adresse email, message,
              type de projet et numéro de téléphone (optionnel)
            </li>
            <li>
              <strong className="text-white">Navigation :</strong> cookies techniques de session,
              données de navigation anonymisées à des fins d'amélioration du site
            </li>
          </ul>
          <p>
            Aucune donnée sensible au sens de l'article 9 du RGPD n'est collectée
            (santé, origine ethnique, opinions politiques, etc.).
          </p>
        </Section>

        {/* 3. Finalités du traitement */}
        <Section title="3. Finalités du traitement">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Répondre à vos demandes de contact, de devis ou de réservation</li>
            <li>Assurer le suivi de la relation commerciale et des projets photographiques</li>
            <li>Améliorer l'expérience utilisateur du site</li>
          </ul>
        </Section>

        {/* 4. Base légale */}
        <Section title="4. Base légale du traitement">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong className="text-white">Intérêt légitime</strong> (art. 6.1.f RGPD) :
              traitement des demandes de contact dans le cadre d'une activité professionnelle
            </li>
            <li>
              <strong className="text-white">Consentement</strong> (art. 6.1.a RGPD) :
              soumission volontaire du formulaire de contact
            </li>
          </ul>
        </Section>

        {/* 5. Durée de conservation */}
        <Section title="5. Durée de conservation">
          <p>
            Le formulaire de contact est transmis via le service d'envoi d'e-mails <strong className="text-white">Brevo</strong>.
            Aucune donnée saisie dans ce formulaire n'est stockée sur nos serveurs : le message est acheminé directement
            par e-mail sans être enregistré dans une base de données.
          </p>
          <p>
            En dehors du formulaire de contact, aucune donnée personnelle n'est collectée ni sauvegardée par ce site.
          </p>
          <p>
            Pour toute demande de suppression d'un e-mail reçu, vous pouvez en faire la demande directement à :{' '}
            <a href="mailto:nenaapic@gmail.com" className="text-white underline hover:opacity-80">nenaapic@gmail.com</a>.
          </p>
        </Section>

        {/* 6. Destinataires */}
        <Section title="6. Destinataires des données">
          <p>
            Les données collectées sont destinées exclusivement à NenaaPic et ne sont
            ni vendues, ni cédées, ni louées à des tiers.
          </p>
          <p>
            Le site est hébergé sur un serveur VPS localisé en France ou au sein de
            l'Union européenne, garantissant un niveau de protection conforme au RGPD.
          </p>
        </Section>

        {/* 7. Droits des personnes */}
        <Section title="7. Vos droits">
          <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong className="text-white">Droit d'accès</strong> à vos données (art. 15)</li>
            <li><strong className="text-white">Droit de rectification</strong> en cas d'inexactitude (art. 16)</li>
            <li><strong className="text-white">Droit à l'effacement</strong> (« droit à l'oubli ») (art. 17)</li>
            <li><strong className="text-white">Droit à la portabilité</strong> de vos données (art. 20)</li>
            <li><strong className="text-white">Droit d'opposition</strong> au traitement (art. 21)</li>
            <li><strong className="text-white">Droit à la limitation</strong> du traitement (art. 18)</li>
          </ul>
          <p>
            Pour exercer l'un de ces droits, adressez votre demande par email à :{' '}
            <a
              href="mailto:nenaapic@gmail.com"
              className="text-gray-300 underline hover:text-white transition-colors"
            >
              nenaapic@gmail.com
            </a>
          </p>
          <p>
            En cas de réponse insatisfaisante, vous pouvez adresser une réclamation à la{' '}
            <strong className="text-white">CNIL</strong> :{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 underline hover:text-white transition-colors"
            >
              www.cnil.fr
            </a>
          </p>
        </Section>

        {/* 8. Cookies */}
        <Section title="8. Cookies">
          <p>
            Le site utilise uniquement des <strong className="text-white">cookies techniques</strong> nécessaires
            à son bon fonctionnement (maintien de session, préférences d'affichage).
          </p>
          <p>
            Aucun cookie publicitaire, de tracking tiers ou de profilage commercial n'est déposé.
          </p>
        </Section>

        {/* 9. Modifications */}
        <Section title="9. Modifications de la politique">
          <p>
            Cette politique de confidentialité peut être mise à jour à tout moment pour
            refléter l'évolution des pratiques ou des obligations légales. La date de
            dernière mise à jour est indiquée en haut de cette page.
          </p>
          <p>
            Il vous appartient de consulter régulièrement cette page pour prendre
            connaissance des éventuelles modifications.
          </p>
        </Section>

        {/* Retour */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <a
            href="/"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Retour à l'accueil
          </a>
        </div>

      </div>
    </div>
  );
};

export default RGPD;
