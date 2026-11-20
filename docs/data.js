window.TRIP = {
  cities: [
    {
      id: "milano",
      name: "Milano",
      region: "LOMBARDIA",
      date: "Arts, aperitivo & design",
      intro: "Design, aperitivo and a special evening at Teatro alla Scala.",
      highlights: [
        { category: "Arts & culture", items: ["Teatro alla Scala", "Duomo di Milano", "Fondazione Prada", "Triennale Milano", "Villa Necchi Campiglio", "Pinacoteca di Brera", "Museo del Novecento"] },
        { category: "Bars", items: ["Bar Basso", "Moebius Milano", "Bene Bene", "Ultramarino", "Bar Nico", "Lubna"] },
        { category: "Restaurants", items: ["Trattoria Masuelli San Marco", "Trattoria Trippa", "Røst", "Trattoria Torre di Pisa", "Osteria Brunello", "Moebius Sperimentale"] },
        { category: "Design & shopping", items: ["Fornasetti", "Nilufar Gallery", "10 Corso Como", "Velasca", "Rossana Orlandi"] }
      ],
      note: "Teatro alla Scala offers a memorable evening of ballet and opera. Check its official website for current performances and tickets."
    },
    {
      id: "modena",
      name: "Modena",
      region: "EMILIA-ROMAGNA",
      date: "Food, history & craftsmanship",
      intro: "Traditional cuisine, balsamic vinegar, Romanesque architecture and Ferrari history.",
      highlights: [
        { category: "Arts & culture", items: ["Duomo di Modena", "Ghirlandina Tower", "Galleria Estense", "Museo Enzo Ferrari", "Casa Museo Luciano Pavarotti", "Palazzo Ducale"] },
        { category: "Bars", items: ["Animo", "Saba – Miscelati e Cucina", "Caffè Concerto", "Mon Cafè"] },
        { category: "Restaurants", items: ["Osteria Francescana", "Franceschetta58", "Hosteria Giusti", "Trattoria Aldina", "Piccola Osteria Zemian", "Antica Moka"] },
        { category: "Local flavors", items: ["Mercato Albinelli", "Acetaia Giusti", "Acetaia Malpighi", "Hombre Farm", "La Consorteria 1966"] }
      ],
      note: "The historic Mercato Albinelli, traditional balsamic vinegar producers and the Duomo make a wonderful starting point for discovering Modena."
    },
    {
      id: "napoli",
      name: "Napoli",
      region: "CAMPANIA",
      date: "Pizza, art & historic streets",
      intro: "Pizza, art and historic streets, with the unmistakable energy of southern Italy.",
      highlights: [
        { category: "Arts & culture", items: ["Museo Cappella Sansevero", "Museo Archeologico Nazionale", "Museo Madre", "Chiostro di Santa Chiara", "Catacombe di San Gennaro", "Certosa di San Martino"] },
        { category: "Bars", items: ["L’Antiquario", "Archivio Storico", "Ex Salumeria", "Archeobar", "Gran Caffè Gambrinus"] },
        { category: "Restaurants", items: ["Concettina ai Tre Santi", "Osteria della Mattonella", "Mimì alla Ferrovia", "Umberto", "Donna Teresa", "Palazzo Petrucci"] },
        { category: "Artisans & shopping", items: ["E. Marinella", "Mario Talarico", "Tramontano", "Via San Gregorio Armeno", "Bottega della Ceramica"] }
      ],
      note: "Plan ahead for popular sites and leave time for pizza, artisan workshops and the historic streets of Napoli."
    },
    {
      id: "roma",
      name: "Roma",
      region: "LAZIO",
      date: "Ancient history & la dolce vita",
      intro: "Ancient history, art, great places to eat and time to explore at your own pace.",
      highlights: [
        { category: "Arts & culture", items: ["Colosseo & Foro Romano", "Galleria Borghese", "Palazzo Altemps", "MAXXI", "Centrale Montemartini", "Basilica di San Clemente", "Musei Capitolini", "Galleria Doria Pamphilj"] },
        { category: "Bars", items: ["Drink Kong", "Freni e Frizioni", "Jerry Thomas Speakeasy", "The Court", "Hassler Hotel terrace"] },
        { category: "Restaurants", items: ["Santo Palato", "Roscioli Salumeria con Cucina", "Da Enzo al 29", "Seu Pizza Illuminati", "Checchino dal 1887", "Da Cesare al Pellegrino"] },
        { category: "Artisans & shopping", items: ["Art Privé", "Essenzialmente Laura", "Bottega del Marmoraro", "Le Mura", "Schostal", "Via del Governo Vecchio"] }
      ],
      note: "Roma rewards an unhurried visit. Check official museum and monument websites for current opening times and ticket information."
    }
  ],
  itinerary: [
    {
      day: "01",
      date: "ARTS, APERITIVO & DESIGN",
      title: "Discover Milano",
      place: "Milano",
      moments: ["Explore the Duomo, Brera and Fondazione Prada.", "Enjoy aperitivo at a neighborhood bar.", "See the official Teatro alla Scala website for its program and ticket information."]
    },
    {
      day: "02",
      date: "FOOD, HISTORY & CRAFTSMANSHIP",
      title: "A taste of Modena",
      place: "Modena",
      moments: ["Browse local ingredients at Mercato Albinelli.", "Discover the city's Romanesque cathedral and historic center.", "Look for a balsamic vinegar tasting at a local producer."]
    },
    {
      day: "03",
      date: "PIZZA, ART & HISTORIC STREETS",
      title: "Explore Napoli",
      place: "Napoli",
      moments: ["Discover the city's historic center and local artisan workshops.", "Visit a museum or a local landmark.", "Make time to enjoy Neapolitan pizza and a classic espresso."]
    },
    {
      day: "04",
      date: "ANCIENT HISTORY & LA DOLCE VITA",
      title: "Take your time in Roma",
      place: "Roma",
      moments: ["See the Colosseo and the ancient Roman sites.", "Choose a museum or gallery that interests you.", "Round off your day with a classic Roman dinner."]
    }
  ],
  essentials: [
    { title: "Check official entry requirements", detail: "Review current requirements that apply to your passport and destination." },
    { title: "Plan how to get around", detail: "Compare local public transport options for each city." },
    { title: "Book popular attractions", detail: "Check official museum, gallery and landmark websites for tickets." },
    { title: "Save accommodation details", detail: "Keep booking confirmations private and easy to access while traveling." },
    { title: "Review your travel documents", detail: "Store personal documents securely and avoid sharing booking references." },
    { title: "Check opening hours", detail: "Verify schedules directly with attractions and restaurants." },
    { title: "Download offline maps", detail: "Save maps for the cities you plan to explore." },
    { title: "Pack comfortable shoes", detail: "Historic neighborhoods are best explored on foot." }
  ],
  files: [
    { name: "An ITALY TRAVEL GUIDES.docx", category: "Travel guides", description: "City guide to local food, art, attractions and shopping." },
    { name: "An ITALY TRAVEL GUIDES.pdf", category: "Travel guides", description: "PDF edition of the Italy city guide." }
  ],
  brands: ["Pantanetti Shoes", "B&B Italia", "Foglizzo", "Paolo Lenti", "Batti", "Vitale Barberis", "Rubelli", "Bonotto", "Manteco", "Dedar", "Limonta"],
  note: "This public guide features general travel inspiration. Keep personal bookings, travel documents and exact itineraries private."
};
