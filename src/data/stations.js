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
            {
                src: "/images/pingpong/pingpong3.jpeg",
                protected: true  // Dieses Foto ist geschützt
            },
            { type: "video", src: "/videos/pingpong/pingpong1.MP4" },
            { type: "video", src: "/videos/pingpong/looser.MOV" },
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
            "/images/auto/1.jpg",
            "/images/auto/2.jpg",
            { type: "video", src: "/videos/auto/2.MOV" },
            "/images/auto/3.jpg",
            { type: "video", src: "/videos/auto/3.MP4" },
            "/images/auto/4.jpg",
            { type: "video", src: "/videos/auto/5.MP4" },
            "/images/auto/14.jpg",
            "/images/auto/5.jpg",
            "/images/auto/6.jpg",
            { type: "video", src: "/videos/auto/6.MOV" },
            "/images/auto/7.jpg",
            "/images/auto/8.jpg",
            { type: "video", src: "/videos/auto/8.mov" },
            "/images/auto/9.jpg",
            "/images/auto/10.jpg",
            "/images/auto/11.jpg",
            "/images/auto/12.jpg",
            { type: "video", src: "/videos/auto/12.MP4" },
            "/images/auto/0.jpg",
            "/images/auto/13.jpg",
            "/images/auto/15.jpg",
            "/images/auto/16.jpg"
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
            "/images/geschenk/1.jpg",
            {
                src: "/images/geschenk/2.jpg",
                protected: true  // Dieses Foto ist geschützt
            },
            "/images/geschenk/3.jpg",
            { type: "video", src: "/videos/geschenk/3.MOV" },
            "/images/geschenk/4.jpg",
            { type: "video", src: "/videos/geschenk/5.MP4" },
            "/images/geschenk/5.jpg"

        ],
        hint: "So gömmer go lerne, weisch no det woni uf dich am morge gwartet han zum dich gseh. Döt wartet die nächsti Erinnerig",
        nextStation: "ost",
        prevStation: "parkplatz"
    },
    ost: {
        number: "4",
        title: "Good old Times",
        memory: "Ich nimm dich mal mit uf en Rückblick i d'Ziit, chlini erinnerige an die guete alte Ziit. Ich hoffe du gniessisch es so wie ich. 🥰",
        photos: [
            "/images/erinnerungen/1.jpg",
            "/images/erinnerungen/2.jpg",
            "/images/erinnerungen/3.jpg",
            "/images/erinnerungen/4.jpg",
            "/images/erinnerungen/5.jpg",
            "/images/erinnerungen/6.jpg",
            "/images/erinnerungen/7.jpg",
            "/images/erinnerungen/8.jpg",
            "/images/erinnerungen/9.jpg",
            "/images/erinnerungen/10.jpg",
            "/images/erinnerungen/11.jpg",
            "/images/erinnerungen/12.jpg",
            "/images/erinnerungen/13.jpg",
            { type: "video", src: "/videos/erinnerungen/13.MP4" },
            { type: "video", src: "/videos/erinnerungen/13.MOV" },
            "/images/erinnerungen/14.jpg",
            { type: "video", src: "/videos/erinnerungen/14.MP4" },
            { type: "video", src: "/videos/erinnerungen/144.MP4" },
            "/images/erinnerungen/15.jpg",
            { type: "video", src: "/videos/erinnerungen/15.MP4" },
            "/images/erinnerungen/16.jpg",
            { type: "video", src: "/videos/erinnerungen/16.MP4" },
            "/images/erinnerungen/17.jpg",
            "/images/erinnerungen/18.jpg",
            "/images/erinnerungen/19.jpg",
            "/images/erinnerungen/20.jpg",
            { type: "video", src: "/videos/erinnerungen/20.MP4" },
            "/images/erinnerungen/21.jpg",
            "/images/erinnerungen/22.jpg",
            "/images/erinnerungen/23.jpg"
        ], // Zwei Fotos
        hint: "",
        nextStation: "versteck",
        prevStation: "starbucks"
    },
    versteck: {
        number: "5",
        title: "Versteckspots",
        memory: "[Hier deine Erinnerung an eure geheimen Versteckspots einfügen]",
        photos: [
            { type: "video", src: "/videos/crazy/1.mp4" },
            { type: "video", src: "/videos/crazy/2.MOV" },
            { type: "video", src: "/videos/crazy/3.MOV" },
            "/images/crazy/03.jpg",
            "/images/crazy/3.jpg",
            "/images/crazy/4.jpg",
            { type: "video", src: "/videos/crazy/5.MP4" },
            { type: "video", src: "/videos/crazy/05.MOV" },
            { type: "video", src: "/videos/crazy/6.MP4" },
            { type: "video", src: "/videos/crazy/05.MP4" },
            "/images/crazy/8.jpg",
            { type: "video", src: "/videos/crazy/7.MOV" },
            { type: "video", src: "/videos/crazy/8.MP4" },
            "/images/crazy/10.jpg",
            { type: "video", src: "/videos/crazy/9.MOV" },
            { type: "video", src: "/videos/crazy/10.MOV" },
            { type: "video", src: "/videos/crazy/11.MP4" },
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
            "/images/love/001.jpg",
            "/images/love/002.jpg",
            "/images/love/003.jpg",
            "/images/love/004.jpg",
            "/images/love/1.jpg",
            "/images/love/01.jpg",
            "/images/love/2.jpg",
            "/images/love/02.jpg",
            "/images/love/006.jpg",
            { type: "video", src: "/videos/love/2.MOV" },
            "/images/love/3.jpg",
            "/images/love/4.jpg",
            "/images/love/005.jpg",
            "/images/love/5.jpg",
            "/images/love/05.jpg",
            "/images/love/6.jpg",
            { type: "video", src: "/videos/love/6.MP4" },
            "/images/love/06.jpg",
            "/images/love/7.jpg",
            "/images/love/8.jpg",
            { type: "video", src: "/videos/love/8.MOV" },
            "/images/love/9.jpg",
            "/images/love/10.jpg"
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
            "/images/schaukel/2.jpg",
            { type: "video", src: "/videos/schaukel/1.MP4" },
            "/images/schaukel/4.jpg",
            "/images/schaukel/04.jpg",
            "/images/schaukel/3.jpg",
            "/images/schaukel/5.jpg",
            "/images/schaukel/05.jpg",
            { type: "video", src: "/videos/schaukel/4.mp4" },
            "/images/schaukel/7.jpg",
            "/images/schaukel/07.jpg",
            "/images/schaukel/8.jpg",
            "/images/schaukel/9.jpg",
            { type: "video", src: "/videos/schaukel/9.MP4" },
            "/images/schaukel/10.jpg",
            "/images/schaukel/11.jpg",
            "/images/schaukel/12.jpg",
            { type: "video", src: "/videos/schaukel/6.MP4" }
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
            "/images/schaukel/13.jpg"

        ],
        isFinal: true,
        prevStation: "schaukel"
    }
};