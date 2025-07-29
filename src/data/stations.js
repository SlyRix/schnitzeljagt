export const stations = {
    start: {
        number: "🎂",
        title: "Happy Birthday Sivani!",
        subtitle: "Eine Reise durch unsere schönsten Erinnerungen - zu deinem 26. Geburtstag 2025",
        isStart: true
    },
    pingpong: {
        number: "1",
        title: "🏓Ping Pong🏓",
        memory: "Lieb üsi Ping Pong Partie, wo du mich immer wieder mal besiegt hasch!💀, aber ihrgend wie hats trotztdem Spass gmacht. Isch glaub langsam ziit zum Dich als Ping Pong Queen zkröne! 👑",
        photos: [
            "/images/pingpong/pingpong1.jpeg",
            "/images/pingpong/pingpong3.jpeg",
            { type: "video", src: "/videos/pingpong1.mp4" },
            { type: "video", src: "/videos/looser.MOV" },
            "/images/pingpong/pingpong4.jpg"
        ], // Array für mehrere Fotos
        hint: "Gömmer mal zu üse lieblings Parkplatz/Spot. Döt wartet e wiiteri Erinnerung uf dich! 🚗",
        nextStation: "parkplatz",
        prevStation: "start"
    },
    parkplatz: {
        number: "2",
        title: "Lieblings Parkplatz",
        memory: "Ah dem ort händ mir scho so viel erlebt gueti und schlechti ziite.Wir hand zäme gschwätzt, gelacht und eifach d'Ziit gnosse. D'Erinnerige an die Momänt sind unvergesslich! ❤️",
        photos: [
            "/images/auto/auto6.jpg",
            "/images/auto/auto1.jpg",
            "/images/auto/auto3.jpg",
            "/images/auto/auto4.jpg",
            "/images/auto/auto5.jpg",
            "/images/auto/auto2.jpg",
            "/images/auto/auto7.jpg",
            "/images/auto/auto8.jpg",
            "/images/auto/auto9.jpg",
            "/images/auto/auto10.jpg",
            "/images/auto/auto11.jpg",
            "/images/auto/auto12.jpg",
            "/images/auto/auto13.jpg",
            "/images/auto/auto14.jpg",
            "/images/auto/auto15.jpg",
            { type: "video", src: "/videos/auto1.mp4" },
            { type: "video", src: "/videos/auto2.mp4" },

        ], // Nur ein Foto
        hint: "Ez deffsch mal go en chillige iced cafe latte mit caramel sirup go bstelle und trinke. ☕️, dort wartet die nächste Surprise uf dich! 🏪",
        nextStation: "starbucks",
        prevStation: "pingpong"
    },
    starbucks: {
        number: "3",
        title: "Starbucks",
        memory: "So gnüss dini Kaffi und Gschenkli 😊. Hoffe es gfallt dir! denkt ich hau mal paar erinnerigs Fotis ine vo letzt Geburtstag.",
        photos: [
            "/images/starbi/starbi1.jpg",
            "/images/starbi/starbi2.jpg",
            "/images/starbi/starbi3.jpg",
            "/images/starbi/starbi4.jpg",

        ], // Zwei Fotos
        hint: "So gömmer go lerne, weisch no det woni uf dich am morge gwartet han zum dich gseh. Döt wartet die nächsti Erinnerig",
        nextStation: "ost",
        prevStation: "parkplatz"
    },
    ost: {
        number: "4",
        title: "Good old Times",
        memory: "Ich nimm dich mal mit uf en Rückblick i d'Ziit, chlini erinnerige an die guete alte Ziit. Ich hoffe du gniessisch es so wie ich. 🥰",
        photos: [
            "/images/ost1.jpg",
            "/images/ost2.jpg",
            "/images/ost3.jpg",
            "/images/ost4.jpg"
        ], // Vier Fotos
        hint: "",
        nextStation: "versteck",
        prevStation: "starbucks"
    },
    versteck: {
        number: "5",
        title: "Versteckspots",
        memory: "[Hier deine Erinnerung an eure geheimen Versteckspots einfügen]",
        photos: [
            "/images/versteck1.jpg",
            "/images/versteck2.jpg"
        ],
        hint: "[Hier deinen Hinweis zu dem Ort, wo ihr zusammengekommen seid, einfügen]",
        nextStation: "zusammen",
        prevStation: "ost"
    },
    zusammen: {
        number: "6",
        title: "Wo wir zusammen kamen",
        memory: "[Hier die Geschichte eures Zusammenkommens einfügen]",
        photos: [
            "/images/zusammen1.jpg",
            "/images/zusammen2.jpg",
            "/images/zusammen3.jpg"
        ],
        hint: "[Hier deinen Hinweis zur Schaukel einfügen]",
        nextStation: "schaukel",
        prevStation: "versteck"
    },
    schaukel: {
        number: "7",
        title: "Schaukel",
        memory: "[Hier deine Erinnerung an die Schaukel einfügen]",
        photos: [
            "/images/schaukel1.jpg"
        ],
        hint: "[Hier deinen Hinweis zum Restaurant als Abschluss einfügen]",
        nextStation: "essen",
        prevStation: "zusammen"
    },
    essen: {
        number: "🎉",
        title: "Unser Abschluss",
        memory: "Du hast unsere Erinnerungsreise gemeistert! Jeder Ort erzählt ein Stück unserer Geschichte.\n\nUnd jetzt lass uns diesen besonderen Tag bei einem wunderbaren Essen ausklingen lassen.\n\nIch liebe dich ❤️",
        photos: [
            "/images/finale1.jpg",
            "/images/finale2.jpg"
        ],
        isFinal: true,
        prevStation: "schaukel"
    }
};