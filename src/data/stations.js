export const stations = {
    start: {
        number: "❤️",
        title: "Alles Gute zum Geburtstag!",
        subtitle: "Eine Reise durch unsere schönsten Erinnerungen",
        isStart: true
    },
    pingpong: {
        number: "1",
        title: "🏓Ping Pong🏓",
        memory: "Lieb üsi Ping Pong Partie, wo du mich immer wieder mal besiegt hasch!💀, aber ihrgend wie hats trotztdem Spass gmacht. Isch glaub langsam ziit zum Dich als Ping Pong Queen zkröne! 👑",
        photos: [
            "/images/pingpong1.jpeg",
            "/images/pingpong3.jpeg",
            { type: "video", src: "/videos/pingpong1.MP4" },
            "/images/pingpong4.jpg"
        ], // Array für mehrere Fotos
        hint: "[Hier deinen Hinweis zum Lieblings-Parkplatz einfügen]",
        nextStation: "parkplatz",
        prevStation: "start"
    },
    parkplatz: {
        number: "2",
        title: "Lieblings Parkplatz",
        memory: "[Hier deine Erinnerung an euren Lieblings-Parkplatz einfügen]",
        photos: [
            "/images/parkplatz1.jpg"
        ], // Nur ein Foto
        hint: "[Hier deinen Hinweis zu Starbucks einfügen]",
        nextStation: "starbucks",
        prevStation: "pingpong"
    },
    starbucks: {
        number: "3",
        title: "Starbucks",
        memory: "[Hier deine Starbucks-Erinnerung einfügen]",
        photos: [
            "/images/starbucks1.jpg",
            "/images/starbucks2.jpg"
        ], // Zwei Fotos
        hint: "[Hier deinen Hinweis zur OST Schule einfügen]",
        nextStation: "ost",
        prevStation: "parkplatz"
    },
    ost: {
        number: "4",
        title: "OST Schule",
        memory: "[Hier deine Erinnerung an die OST Schule einfügen]",
        photos: [
            "/images/ost1.jpg",
            "/images/ost2.jpg",
            "/images/ost3.jpg",
            "/images/ost4.jpg"
        ], // Vier Fotos
        hint: "[Hier deinen Hinweis zu den Versteckspots einfügen]",
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