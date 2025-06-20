import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-16 px-6">
            <article className="max-w-3xl w-full bg-white border border-gray-300 rounded-lg shadow-lg p-10 font-sans text-gray-800">
                <header>
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
                        Privacybeleid van Festiland
                    </h1>
                    <p className="text-sm text-gray-500 italic mb-10">Laatst bijgewerkt: 16 juni 2025</p>
                </header>

                <p className="mb-8 leading-relaxed">
                    Welkom bij <strong>Festiland</strong>! We hechten veel waarde aan jouw privacy en doen er alles aan om jouw persoonsgegevens te beschermen. In dit privacybeleid leggen we uit welke gegevens we verzamelen, waarom we dat doen en hoe we daarmee omgaan.
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Wie zijn wij?</h2>
                    <p>
                        Festiland is een online platform waar bezoekers informatie en reviews kunnen vinden over festivals. Wij zijn verantwoordelijk voor de verwerking van jouw persoonsgegevens zoals beschreven in dit beleid.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Welke gegevens verzamelen wij?</h2>
                    <p>
                        We verzamelen accountgegevens, reviewgegevens, technische gegevens en cookies. Deze helpen ons de site te verbeteren en jouw ervaring veilig te houden.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Waarom verzamelen wij jouw gegevens?</h2>
                    <p>
                        Om reviews te tonen en beheren, de gebruikerservaring te verbeteren, de website te beveiligen, misbruik op te sporen en (indien je toestemming geeft) nieuwsbrieven te sturen.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Met wie delen wij gegevens?</h2>
                    <p>
                        We delen jouw gegevens niet met derden, tenzij dit nodig is voor technische diensten, wettelijk verplicht is of je toestemming hebt gegeven. Alle externe partijen verwerken jouw gegevens volgens de AVG (GDPR).
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Bewaartermijn</h2>
                    <p>
                        Reviews bewaren we zolang het platform bestaat tenzij je verwijdering vraagt. Accountgegevens bewaren we tot je je account verwijdert. Technische gegevens bewaren we maximaal 12 maanden.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Jouw rechten</h2>
                    <p>
                        Je hebt het recht om inzage te krijgen, gegevens aan te passen of te laten verwijderen, bezwaar te maken, toestemming in te trekken en een klacht in te dienen bij de Autoriteit Persoonsgegevens.
                    </p>
                    <p className="mt-2">Neem hiervoor contact op via <strong>privacy@festiland.nl</strong>.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Cookies</h2>
                    <p>
                        We gebruiken cookies om onze website beter te laten functioneren. Bij je eerste bezoek vragen we toestemming. Je kunt jouw voorkeuren altijd aanpassen. Meer info vind je in ons.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Beveiliging</h2>
                    <p>
                        We nemen technische en organisatorische maatregelen om jouw gegevens te beschermen tegen verlies, misbruik of ongeautoriseerde toegang.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Wijzigingen in dit beleid</h2>
                    <p>
                        Dit privacybeleid kan aangepast worden. Bij belangrijke wijzigingen informeren we je via de website of per e-mail (als je geregistreerd bent).
                    </p>
                </section>

            </article>
        </div>
    );
};

export default PrivacyPolicy;