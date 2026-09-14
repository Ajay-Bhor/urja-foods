import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    languageName: 'English',
    topBar: {
      helpline: 'Farmer & Customer Helpline',
      email: 'info@urjafoods.net',
      location: 'Nirgudsar, Pune, Maharashtra',
      motto: '20 Years of Trust, Now with a European Edge!',
      iso: 'ISO Certified'
    },
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      products: 'Pashu Aahar & Feeds',
      brands: 'Our Brands',
      tech: 'European EC Tech',
      contact: 'Contact Us',
      careers: 'Careers',
      cta: 'Feed / Dealership Inquiry'
    },
    hero: {
      slides: [
        {
          badge: 'Pioneering Maharashtra Agriculture',
          title: '20 Years of Trust, Now with a European Edge!',
          subtitle: 'For the first time in Maharashtra, Urja established 100% European Environmental Controlled (EC) sheds with computerized ventilation and climate automation — delivering antibiotic-free, juicy, and hygienic chicken.',
          tagline: 'Continuous Innovation in Poultry & Animal Nutrition',
          cta1: 'Explore Pashu Aahar & Feeds',
          cta2: 'Farmer & Dealership Inquiry',
          stats: [
            { label: 'European EC Tech', value: '100%' },
            { label: 'Antibiotic Residues', value: 'Zero' },
            { label: 'Auto-Vaccination', value: 'High Immunity' }
          ]
        },
        {
          badge: 'Urja Pashu Aahar',
          title: 'Urja Pashu Aahar — Complete Source of Energy!',
          subtitle: 'Scientifically steam-cooked pellet feeds enriched with bypass fat, digestible proteins, and chelated micro-minerals. Formulated to maximize daily milk yield and enhance fat/SNF percentages.',
          tagline: 'Supreme Gold 5000 • Malai Plus 8000 • Milk O Milk • Max Magic',
          cta1: 'View Cattle Feeds',
          cta2: 'Book Feed Supplies',
          stats: [
            { label: 'Milk Yield Boost', value: '+2-3 Litres' },
            { label: 'Fat & SNF', value: 'Superior' },
            { label: 'Pellet Digestion', value: 'Instant' }
          ]
        },
        {
          badge: 'State-of-the-Art Feed Milling',
          title: '150 TPD Automated & Computerized Feed Plant',
          subtitle: 'Located in Nirgudsar, Pune. Operating advanced computer-controlled weighing, grinding, batching, and pellet conditioning to supply consistent, premium-grade nutrition to over 10,000 farmers.',
          tagline: 'Empowering Rural Farmers Since 2005 • Founded by Mr. Pramod Anandrao Hinge',
          cta1: 'Explore Milling Capacity',
          cta2: 'Become a Distributor',
          stats: [
            { label: 'Milling Capacity', value: '150 TPD' },
            { label: 'Partner Farmers', value: '10,000+' },
            { label: 'Pune Network', value: 'Owned Branches' }
          ]
        }
      ]
    },
    stats: [
      { value: '20+ Years', label: 'Heritage of Trust', sublabel: 'Serving farmers since 2005' },
      { value: '150 TPD', label: 'Feed Plant Capacity', sublabel: 'Automated & computerized' },
      { value: '100%', label: 'European EC Sheds', sublabel: 'First time in Maharashtra' },
      { value: '10,000+', label: 'Partner Farmers', sublabel: 'Across Western Maharashtra' },
      { value: 'Zero Residue', label: 'Antibiotic-Free', sublabel: 'Hygienic & tasty chicken' }
    ],
    about: {
      tag: 'About Urja Foods & Agro',
      title: 'Rooted in Agriculture, Driven by Continuous Innovation',
      p1: 'The journey of Urja started with a humble cattle feed manufacturing unit in the year 2005, born from the farm-background family of Mr. Pramod Anandrao Hinge with aspirations to improve stable financial income for farmers in remote rural Maharashtra.',
      p2: 'Our core value has consistently taught us "Continuous Innovation". Guided by this principle, Urja pioneered the establishment of 100% European Environmental Controlled (EC) Sheds in Maharashtra, achieving unprecedented hygiene, temperature control, and low poultry mortality.',
      cardTitle: 'The Odyssey of Urja (Since 2005)',
      cardDesc: 'Founded by Mr. Pramod Anandrao Hinge from Nirgudsar, Pune.',
      millingBadge: 'Automated Pellet Feed Mill',
      pillars: [
        {
          title: 'Continuous Innovation',
          desc: 'Pioneered 100% European Environmental Controlled (EC) poultry sheds in Maharashtra for superior bird health.'
        },
        {
          title: 'Farmer Empowerment',
          desc: 'Founded by Mr. Pramod Anandrao Hinge from an agrarian family to provide steady financial returns to rural livestock owners.'
        },
        {
          title: 'Uncompromised Quality',
          desc: 'Automated computerized 150 TPD pellet plant ensuring consistent steam-conditioned nutrition in every bag.'
        },
        {
          title: 'Antibiotic-Free Safety',
          desc: 'Guaranteed hygienic, fresh, antibiotic-free poultry produced through biosecure and auto-vaccinated breeding.'
        }
      ],
      btn1: 'Discover Our Business Verticals',
      btn2: 'Contact Management'
    },
    services: {
      tag: 'Integrated Agro Solutions',
      title: 'Our Core Business Services & Divisions',
      subtitle: 'From farm-level contract broiler management to computerized feed manufacturing and QSR outlets, Urja delivers complete agro-industrial excellence.',
      inquireBtn: 'Inquire for',
      items: [
        {
          title: 'Contract Broiler Farming',
          tag: 'Core Business',
          desc: 'Urja operates contract broiler farming from owned branches across Pune district with 100% European EC House infrastructure, computerized climate ventilation, and dedicated veterinary support.',
          points: ['100% European Climate Controlled sheds', 'Antibiotic-free meat production', 'Dedicated branch veterinary support', 'Assured farmer profit model']
        },
        {
          title: '150 TPD Automated Feed Plant',
          tag: 'Manufacturing',
          desc: 'State-of-the-art pellet feed production plant in Nirgudsar, Pune. Computerized micro-ingredient dosing, steam conditioning, and lab-tested batches for cattle, broilers, and layers.',
          points: ['150 Tons Per Day capacity', 'Steam-conditioned nutrient preservation', 'Strict laboratory batch testing', 'Available in bulk & 50kg bags']
        },
        {
          title: 'Commercial Hatchery & Chicks',
          tag: 'Genetics & Breeding',
          desc: 'Hygienic day-old chick production equipped with an automated in-ovo and spray vaccination system, guaranteeing high vitality, rapid feathering, and exceptionally low mortality.',
          points: ['Automated vaccination equipment', 'Low chick mortality ratio', 'Uniform weight and vitality', 'High disease resistance']
        },
        {
          title: 'Chicken Feast & QSR Outlets',
          tag: 'Retail Outlets',
          desc: 'Supplying fresh, tender, antibiotic-free chicken directly from our environmental sheds to retail counters and QSR chicken outlets with certified cold chain preservation.',
          points: ['Zero antibiotic chemical residues', 'Tender, juicy, and hygienic meat', 'Cold-chain delivery in Pune & Mumbai', 'Trusted by top food brands']
        },
        {
          title: 'Urja Pashu Aahar Nutrition',
          tag: 'Dairy Science',
          desc: 'Tailored nutritional feed lines including Milking & Non-Milking formulations (Supreme Gold, Malai Plus, Milk O Milk, Max Magic, Calf Starter) maximizing milk yield and SNF.',
          points: ['Formulated for high milk yield', 'Rich in bypass fats and minerals', 'Improves herd fertility & health', 'Highly palatable steam pellets']
        }
      ]
    },
    products: {
      tag: 'Complete Source of Energy',
      title: 'Urja Pashu Aahar & Animal Feed Catalog',
      subtitle: 'Manufactured in our computerized 150 TPD automated pellet feed plant in Nirgudsar, Pune. Enriched with essential amino acids, bypass fats, and micro-minerals.',
      categories: {
        all: 'All Products',
        cattle: 'Cattle Feed / Pashu Aahar',
        poultry: 'Broiler & Deshi Feeds',
        layer: 'Layer Concentrates & Pre-Mixes'
      },
      viewSpecs: 'Specs',
      bookQuote: 'Book / Get Price Quote',
      modalTitle: 'Lab Certified Nutritional Specifications:',
      modalBenefits: 'Key Farmer Benefits:',
      modalCta: 'Request Bulk Quote for this Product',
      modalClose: 'Close'
    },
    brands: {
      tag: 'Market-Leading Portfolio',
      title: 'Our Proprietary Brands & Product Lines',
      subtitle: 'Trusted by over 10,000 dairy farmers, poultry breeders, and consumers across Pune, Ahmednagar, and Western Maharashtra.',
      verified: 'Verified Quality Standard'
    },
    technology: {
      badge: 'Pioneering European Standards in Maharashtra',
      title: '100% European Environmental Controlled (EC) Sheds',
      subtitle: 'For the first time in Maharashtra, Urja Foods established European-standard fully automated EC houses. By removing environmental stressors, our poultry thrives naturally with superior feed conversion ratios (FCR) and guaranteed antibiotic-free meat.',
      features: [
        {
          title: 'Automated Tunnel Ventilation',
          desc: 'Negative pressure tunnel fans continuously refresh air, maintaining ideal oxygen and moisture parameters across all seasons.'
        },
        {
          title: 'Micro-Climate Temperature Control',
          desc: 'Computerized sensors adjust cooling pads and heating systems in real-time, eliminating heat stress even in extreme summers.'
        },
        {
          title: '100% Antibiotic-Free Meat',
          desc: 'By providing an impeccably clean, biosecure climate, our birds thrive naturally without requiring preventive antibiotics.'
        },
        {
          title: 'In-Ovo & Spray Auto-Vaccination',
          desc: 'Our modern hatchery unit deploys automated precision vaccination ensuring day-old chicks have maximum disease immunity and lowest mortality.'
        }
      ],
      cta: 'Partner with Urja in Contract EC Farming',
      stats: [
        { label: 'Regulated Temp', value: '22°C - 24°C' },
        { label: 'Low Mortality', value: '<2.5%' },
        { label: 'Target FCR', value: '1.5 - 1.6' }
      ]
    },
    contact: {
      tag: 'Get in Touch with Urja Foods',
      title: 'Book Feeds or Inquire for Dealership',
      desc: 'Whether you are a dairy farmer seeking high-yield Urja Pashu Aahar, an entrepreneur seeking dealership rights, or a poultry farmer wanting to join our European EC Contract Farming network, our team is at your service.',
      formTitle: 'Direct Inquiry & Dealership Form',
      formDesc: 'Fill your details below. Our field representative from the Pune headquarters will connect with you promptly.',
      labels: {
        name: 'Full Name *',
        phone: 'Contact Mobile *',
        email: 'Email Address (Optional)',
        location: 'District / Village',
        category: 'Inquiry Category',
        message: 'Specific Requirement / Message',
        submit: 'Submit Inquiry to Urja Foods',
        submitting: 'Submitting Inquiry...'
      },
      categories: [
        { value: 'Cattle Feed / Pashu Aahar', label: 'Cattle Feed / Pashu Aahar (Supreme Gold, Malai Plus)' },
        { value: 'Dealership / Distributorship', label: 'Dealership / Distributor Application' },
        { value: 'Contract Broiler Farming (EC House)', label: 'Contract Broiler Farming in European EC Sheds' },
        { value: 'Poultry Feeds / Layer Concentrates', label: 'Poultry Feeds & Layer Concentrates' },
        { value: 'Broiler Chicks & Hatchery', label: 'Day-Old Broiler Chicks Booking' },
        { value: 'Chicken Feast / QSR Retail', label: 'Chicken Feast Retail / QSR Outlets' },
        { value: 'Other Commercial Inquiry', label: 'Other Commercial Inquiry' }
      ],
      helplineTitle: 'Customer & Farmer Helpline',
      helplineTiming: 'Mon - Sat: 9:00 AM to 6:30 PM',
      emailTitle: 'Official Email',
      emailSub: 'Prompt responses to commercial inquiries',
      addressTitle: 'Headquarters & Automated Feed Mill',
      addressText: 'At Post Nirgudsar, Taluka Ambegaon, District Pune, Maharashtra 410503, India.'
    },
    careers: {
      tag: 'Build Your Future with Urja',
      title: 'Careers at Urja Foods & Agro',
      subtitle: 'Join a family of 250+ dedicated professionals driving agricultural prosperity across Maharashtra with European poultry tech and 150 TPD computerized feed milling.',
      whyJoinTitle: 'Why Build Your Career at Urja Foods?',
      whyJoinSubtitle: 'We combine authentic rural values with international technology, offering an empowering work environment and industry-leading career progression.',
      perks: [
        {
          title: 'Purpose-Driven Impact',
          desc: 'Directly empower 10,000+ dairy and poultry farmers across Western Maharashtra to earn stable livelihoods.'
        },
        {
          title: 'Advanced European Tech',
          desc: 'Gain hands-on expertise with Maharashtra’s first 100% European EC computerized poultry sheds and automated 150 TPD pellet plants.'
        },
        {
          title: 'Comprehensive Benefits',
          desc: 'Competitive salary packages, PF, gratuity, medical coverage, performance bonuses, and on-site quarters for plant technicians.'
        },
        {
          title: 'Fast-Track Promotions',
          desc: 'Merit-oriented recognition culture where commitment and operational initiative are actively rewarded with leadership roles.'
        }
      ],
      filterAll: 'All Positions',
      openingsTitle: 'Current Career Openings',
      openingsSubtitle: 'Explore open roles across veterinary health, plant engineering, farm operations, quality control, and regional sales.',
      applyBtn: 'Apply for Position',
      appliedSuccess: 'Application Submitted Successfully!',
      appliedMsg: 'Thank you for your interest in joining Urja Foods & Agro. Our HR recruitment team will review your credentials and get in touch.',
      form: {
        title: 'Submit Your Job Application',
        subtitle: 'Fill your credentials below for direct evaluation by Urja Foods HR department.',
        name: 'Full Name *',
        phone: 'Mobile Number *',
        email: 'Email Address',
        position: 'Position Applying For *',
        qualification: 'Highest Qualification *',
        experience: 'Years of Experience *',
        location: 'Current City / District *',
        resumeText: 'Key Skills / Experience Summary / Resume Link',
        submit: 'Submit Application',
        submitting: 'Processing Application...'
      },
      directHrTitle: 'Spontaneous Applications & HR Inquiries',
      directHrDesc: 'Don’t see your exact profile listed? We are always keen to connect with passionate agricultural, veterinary, and engineering talent.',
      sendCv: 'Send your CV directly to:',
      hrEmail: 'careers@urjafoods.net'
    },
    footer: {
      desc: 'The odyssey of Urja started in 2005 with a cattle feed manufacturing unit, founded by Mr. Pramod Anandrao Hinge to provide a stable financial income for rural farmers. Pioneering 100% European Environmental Controlled broiler sheds and computerized 150 TPD feed milling.',
      motto: '20 Years of Trust, Now with a European Edge!',
      quickLinks: 'Quick Links',
      featuredProducts: 'Featured Products',
      plantContact: 'Plant & Contact',
      capacityInfo: '150 TPD Capacity • Supplying Pune, Ahmednagar, Solapur, Nashik & Western Maharashtra.',
      rights: 'All rights reserved.',
      backToTop: 'Back to top'
    }
  },

  mr: {
    languageName: 'मराठी',
    topBar: {
      helpline: 'शेतकरी व ग्राहक हेल्पलाइन',
      email: 'info@urjafoods.net',
      location: 'निरगुडसर, पुणे, महाराष्ट्र',
      motto: '२० वर्षांचा विश्वास, आता युरोपियन तंत्रज्ञानासह!',
      iso: 'आयएसओ प्रमाणित'
    },
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      services: 'आमच्या सेवा',
      products: 'पशु आहार व फीड्स',
      brands: 'आमचे ब्रँड्स',
      tech: 'युरोपियन ईसी तंत्रज्ञान',
      contact: 'संपर्क',
      careers: 'करिअर',
      cta: 'पशु आहार / डीलरशिप चौकशी'
    },
    hero: {
      slides: [
        {
          badge: 'महाराष्ट्रात प्रथमच १००% युरोपियन तंत्रज्ञान',
          title: '२० वर्षांचा विश्वास, आता युरोपियन तंत्रज्ञानासह!',
          subtitle: 'महाराष्ट्रात पहिल्यांदाच उर्जाने १००% युरोपियन एन्व्हायर्नमेंटल कंट्रोल्ड (EC) शेड्स उभारल्या आहेत. स्वयंचलित तापमान व वेंटिलेशन नियंत्रणाद्वारे अँटिबायोटिक-मुक्त, ताजे आणि रसाळ चिकन उत्पादन केले जाते.',
          tagline: 'पोल्ट्री व पशु पोषणात निरंतर नवनिर्मिती',
          cta1: 'पशु आहार उत्पादने पहा',
          cta2: 'शेतकरी व डीलरशिप नोंदणी',
          stats: [
            { label: 'युरोपियन ईसी तंत्रज्ञान', value: '१००%' },
            { label: 'अँटिबायोटिक अंश', value: 'शून्य (Zero)' },
            { label: 'स्वयंचलित लसीकरण', value: 'उच्च प्रतिकारशक्ती' }
          ]
        },
        {
          badge: 'उर्जा पशु आहार',
          title: 'उर्जा पशु आहार — ऊर्जेचा संपूर्ण स्रोत!',
          subtitle: 'बायपास फॅट, सहज पचणारे प्रथिने आणि चिलेटेड खनिजांनी समृद्ध स्टीम-कुक पेलेट फीड. गाई-म्हशींचे दैनंदिन दूध उत्पादन आणि फॅट/SNF वाढवण्यासाठी विशेष वैज्ञानिक सूत्र.',
          tagline: 'सुप्रीम गोल्ड ५००० • मलाई प्लस ८००० • मिल्क ओ मिल्क • मॅक्स मॅजिक',
          cta1: 'पशु आहार प्रकार पहा',
          cta2: 'खत व फीड बुकिंग करा',
          stats: [
            { label: 'दूध उत्पादनात वाढ', value: '+२ ते ३ लिटर' },
            { label: 'फॅट व एसएनएफ', value: 'उत्कृष्ट' },
            { label: 'पेलेट पचनक्षमता', value: 'त्वरित' }
          ]
        },
        {
          badge: 'अत्याधुनिक स्वयंचलित फीड प्लांट',
          title: '१५० टन/दिवस पूर्णतः कॉम्प्युटराइज्ड फीड प्लांट',
          subtitle: 'निरगुडसर (ता. आंबेगाव, जि. पुणे) येथे स्थित. अत्याधुनिक संगणकीकृत बॅचिंग, ग्राइंडिंग आणि पेलेटिंगद्वारे १०,००० हून अधिक शेतकऱ्यांना सातत्यपूर्ण व प्रमाणित पोषण पुरवठा.',
          tagline: '२००५ पासून शेतकऱ्यांचे सक्षमीकरण • संस्थापक: श्री. प्रमोद आनंदराव हिंगे',
          cta1: 'उत्पादन क्षमता जाणून घ्या',
          cta2: 'वितरक व्हा',
          stats: [
            { label: 'उत्पादन क्षमता', value: '१५० टन/दिवस' },
            { label: 'सहभागी शेतकरी', value: '१०,०००+' },
            { label: 'पुणे जिल्हा नेटवर्क', value: 'स्वतःच्या शाखा' }
          ]
        }
      ]
    },
    stats: [
      { value: '२०+ वर्षे', label: 'विश्वासाचा वारसा', sublabel: '२००५ पासून शेतकरी सेवेत' },
      { value: '१५० टन/दिवस', label: 'फीड प्लांट क्षमता', sublabel: 'स्वयंचलित व कॉम्प्युटराइज्ड' },
      { value: '१००%', label: 'युरोपियन ईसी शेड्स', sublabel: 'महाराष्ट्रात प्रथमच' },
      { value: '१०,०००+', label: 'सहभागी शेतकरी', sublabel: 'पश्चिम महाराष्ट्रभर' },
      { value: 'शून्य अंश', label: 'अँटिबायोटिक-मुक्त', sublabel: 'आरोग्यदायी व चवदार चिकन' }
    ],
    about: {
      tag: 'उर्जा फूड्स अँड ॲग्रो बद्दल',
      title: 'कृषीनिष्ठ परंपरा, निरंतर नवनिर्मितीचा ध्यास',
      p1: 'उर्जाची सुरुवात २००५ मध्ये ग्रामीण भागातील शेतकऱ्यांना स्थिर आर्थिक उत्पन्न मिळवून देण्याच्या उद्देशाने, शेतकरी पार्श्वभूमीतील श्री. प्रमोद आनंदराव हिंगे यांच्या संकल्पनेतून पशु आहार निर्मिती युनिटने झाली.',
      p2: 'आमच्या मूल्यांनी आम्हाला "निरंतर नवनिर्मिती" (Continuous Innovation) शिकवले आहे. या प्रेरणेतूनच महाराष्ट्रात पहिल्यांदाच उर्जाने १००% युरोपियन एन्व्हायर्नमेंटल कंट्रोल्ड (EC) शेड्स उभारून उच्च स्वच्छता आणि नीचांकी पक्षी मृत्यूदर साध्य केला.',
      cardTitle: 'उर्जाची यशस्वी वाटचाल (२००५ पासून)',
      cardDesc: 'संस्थापक: श्री. प्रमोद आनंदराव हिंगे, निरगुडसर, पुणे.',
      millingBadge: 'स्वयंचलित पेलेट फीड मिल',
      pillars: [
        {
          title: 'निरंतर नवनिर्मिती',
          desc: 'पक्ष्यांच्या उत्कृष्ट आरोग्यासाठी महाराष्ट्रात प्रथमच १००% युरोपियन ईसी शेड्सची यशस्वी उभारणी.'
        },
        {
          title: 'शेतकरी सक्षमीकरण',
          desc: 'ग्रामीण भागातील पशुपालक व पोल्ट्री शेतकऱ्यांना हमखास व स्थिर नफा मिळवून देणे.'
        },
        {
          title: 'अतूट गुणवत्ता',
          desc: '१५० टन क्षमतेच्या कॉम्प्युटराइज्ड प्लांटमधून प्रत्येक बॅगमध्ये प्रमाणित स्टीम-कुक्ड पोषण.'
        },
        {
          title: 'अँटिबायोटिक-मुक्त चिकन',
          desc: 'बायोसुरक्षित वातावरण आणि स्वयंचलित लसीकरणातून ग्राहकांसाठी १००% रसायनमुक्त ताजे मांस.'
        }
      ],
      btn1: 'आमच्या व्यावसायिक सेवा पहा',
      btn2: 'व्यवस्थापनाशी संपर्क साधा'
    },
    services: {
      tag: 'एकात्मिक कृषी व्यवसाय',
      title: 'आमच्या मुख्य व्यावसायिक सेवा व विभाग',
      subtitle: 'शेतकऱ्यांसोबत ब्रॉयलर फार्मिंगपासून ते संगणकीकृत फीड निर्मिती आणि चिकन फिस्ट आऊटलेट्सपर्यंत उर्जाची सर्वसमावेशक सेवा.',
      inquireBtn: 'चौकशी करा -',
      items: [
        {
          title: 'कॉन्ट्रॅक्ट ब्रॉयलर फार्मिंग',
          tag: 'मुख्य व्यवसाय',
          desc: 'पुणे जिल्ह्यातील स्वतःच्या शाखांमार्फत १००% युरोपियन ईसी हाऊस तंत्रज्ञानासह आधुनिक ब्रॉयलर फार्मिंग, तापमान नियंत्रण आणि तज्ज्ञ पशुवैद्यकीय मार्गदर्शन.',
          points: ['१००% युरोपियन हवामान नियंत्रित शेड्स', 'अँटिबायोटिक-मुक्त उत्पादन', 'शाखांमार्फत २४/७ वैद्यकीय सहाय्य', 'शेतकऱ्यांना हमखास उत्पन्न मॉडेल']
        },
        {
          title: '१५० टन स्वयंचलित फीड प्लांट',
          tag: 'उत्पादन युनिट',
          desc: 'निरगुडसर, पुणे येथील अत्याधुनिक कॉम्प्युटराइज्ड पेलेट फीड प्लांट. गायी, म्हशी, ब्रॉयलर आणि लेयर पक्ष्यांसाठी लॅब-प्रमाणित संतुलित पोषण.',
          points: ['१५० टन प्रतिदिन उत्पादन क्षमता', 'स्टीम-कंडिशनिंग तंत्रज्ञान', 'अत्याधुनिक प्रयोगशाळेत चाचणी', '५० किलो बॅग व बल्कमध्ये उपलब्ध']
        },
        {
          title: 'आधुनिक हॅचरी व ब्रॉयलर चिक्स',
          tag: 'उत्कृष्ट ब्रीडिंग',
          desc: 'स्वयंचलित इन-ओव्हो व स्प्रे लसीकरण सुविधेसह सुदृढ एकदिवसीय पिल्लांची निर्मिती, ज्यामुळे उच्च प्रतिकारशक्ती व कमी मृत्यूदर मिळतो.',
          points: ['स्वयंचलित लसीकरण प्रणाली', 'अत्यंत कमी मृत्यूदर गुणोत्तर', 'एकसमान वजन व चपळ पिल्ले', 'रोगांना उत्तम प्रतिकार']
        },
        {
          title: 'चिकन फिस्ट / क्यूएसआर आऊटलेट्स',
          tag: 'रिटेल विक्री',
          desc: 'थेट आमच्या नियंत्रित फार्म्समधून ग्राहकांना ताजे, चवदार, रसाळ आणि अँटिबायोटिक-मुक्त चिकन कोल्ड-चेन वाहतुकीद्वारे पुरवले जाते.',
          points: ['शून्य रासायनिक औषधांचे अवशेष', 'मऊ, रसाळ व ताजे मांस', 'पुणे व मुंबईत थेट पुरवठा', 'प्रसिद्ध ब्रँड्सचा विश्वास']
        },
        {
          title: 'उर्जा संतुलित पशु आहार',
          tag: 'दुग्ध व्यवसाय पोषण',
          desc: 'दुभत्या जनावरांसाठी (सुप्रीम गोल्ड, मलाई प्लस, मिल्क ओ मिल्क, मॅक्स मॅजिक, काल्फ स्टार्टर) दूध उत्पादन आणि फॅट वाढवणारा पेलेट आहार.',
          points: ['दूध उत्पादनात भरीव वाढ', 'बायपास फॅट व खनिजांचे मिश्रण', 'जनावरांची पचनक्षमता सुधारते', 'स्वादिष्ट व सहज खाण्यायोग्य पेलेट्स']
        }
      ]
    },
    products: {
      tag: 'ऊर्जेचा संपूर्ण स्रोत',
      title: 'उर्जा पशु आहार व फीड्स कॅटलॉग',
      subtitle: 'निरगुडसर, पुणे येथील अत्याधुनिक १५० टन स्वयंचलित कॉम्प्युटराइज्ड प्लांटमध्ये उत्पादित. आवश्यक अमिनो ॲसिड, बायपास फॅट व सूक्ष्म खनिजांनी समृद्ध.',
      categories: {
        all: 'सर्व उत्पादने (All)',
        cattle: 'पशु आहार (Cattle Feed)',
        poultry: 'ब्रॉयलर व गावरान फीड (Poultry)',
        layer: 'लेयर कॉन्सन्ट्रेट व प्री-मिक्स'
      },
      viewSpecs: 'तपशील',
      bookQuote: 'दरपत्रक / बुकिंग करा',
      modalTitle: 'प्रयोगशाळा प्रमाणित पोषण घटक:',
      modalBenefits: 'शेतकऱ्यांसाठी मुख्य फायदे:',
      modalCta: 'या उत्पादनासाठी कोटेशन मागवा',
      modalClose: 'बंद करा'
    },
    brands: {
      tag: 'अग्रगण्य ब्रँड पोर्टफोलिओ',
      title: 'आमचे नामांकित ब्रँड्स व उत्पादने',
      subtitle: 'पुणे, अहिल्यानगर, सोलापूर आणि संपूर्ण पश्चिम महाराष्ट्रातील १०,००० हून अधिक दुग्ध उत्पादक व पोल्ट्री शेतकऱ्यांचा विश्वास.',
      verified: 'प्रमाणित गुणवत्ता मानक'
    },
    technology: {
      badge: 'महाराष्ट्रात प्रथमच युरोपियन मानके',
      title: '१००% युरोपियन एन्व्हायर्नमेंटल कंट्रोल्ड (EC) शेड्स',
      subtitle: 'महाराष्ट्रात पहिल्यांदाच उर्जा फूड्सने युरोपियन मानकांची स्वयंचलित ईसी घरे उभारली. वातावरणातील बदलांचा ताण नसल्यामुळे पक्ष्यांची नैसर्गिक वाढ होते आणि औषधांशिवाय उत्कृष्ट चिकन मिळते.',
      features: [
        {
          title: 'स्वयंचलित टनेल वेंटिलेशन',
          desc: 'निगेटिव्ह प्रेशर टनेल पंखे सतत हवा खेळती ठेवतात, ज्यामुळे वर्षभर योग्य ऑक्सिजन आणि आर्द्रता राखली जाते.'
        },
        {
          title: 'मायक्रो-क्लायमेट तापमान नियंत्रण',
          desc: 'संगणकीय सेन्सर्स कुलिंग पॅड्स आणि हीटिंग नियंत्रित करतात, ज्यामुळे उन्हाळ्यातही पक्ष्यांना उष्णतेचा त्रास होत नाही.'
        },
        {
          title: '१००% अँटिबायोटिक-मुक्त चिकन',
          desc: 'अत्यंत स्वच्छ आणि निर्जंतुक वातावरणामुळे पक्ष्यांना प्रतिबंधक अँटिबायोटिक्स देण्याची अजिबात गरज पडत नाही.'
        },
        {
          title: 'स्वयंचलित लसीकरण हॅचरी',
          desc: 'अत्याधुनिक हॅचरी युनिटमध्ये स्प्रे व स्वयंचलित लसीकरणामुळे पिल्लांना जन्मापासूनच भक्कम प्रतिकारशक्ती मिळते.'
        }
      ],
      cta: 'उर्जासोबत युरोपियन ईसी कॉन्ट्रॅक्ट फार्मिंग सुरू करा',
      stats: [
        { label: 'नियंत्रित तापमान', value: '२२°C - २४°C' },
        { label: 'कमी मृत्यूदर', value: '<२.५%' },
        { label: 'लक्ष्य एफसीआर (FCR)', value: '१.५ - १.६' }
      ]
    },
    contact: {
      tag: 'उर्जा फूड्सशी संपर्क साधा',
      title: 'पशु आहार बुकिंग व डीलरशिप अर्ज',
      desc: 'तुम्ही दुग्ध उत्पादक शेतकरी असाल, नवीन डीलरशिप सुरू करू इच्छित असाल किंवा युरोपियन ईसी कॉन्ट्रॅक्ट फार्मिंगमध्ये सामील होऊ इच्छित असाल, आमची टीम सदैव तत्पर आहे.',
      formTitle: 'थेट चौकशी व डीलरशिप अर्ज',
      formDesc: 'खालील माहिती भरा. पुणे मुख्यालयातील आमचे प्रतिनिधी आपल्याशी त्वरित संपर्क साधतील.',
      labels: {
        name: 'पूर्ण नाव *',
        phone: 'मोबाईल नंबर *',
        email: 'ईमेल आयडी (पर्यायी)',
        location: 'गाव / तालुका / जिल्हा',
        category: 'चौकशीचा प्रकार',
        message: 'आपली गरज किंवा संदेश',
        submit: 'उर्जा फूड्सकडे नोंदवा',
        submitting: 'नोंदणी होत आहे...'
      },
      categories: [
        { value: 'Cattle Feed / Pashu Aahar', label: 'पशु आहार (सुप्रीम गोल्ड, मलाई प्लस, मिल्क ओ मिल्क)' },
        { value: 'Dealership / Distributorship', label: 'डीलरशिप / वितरक अर्ज' },
        { value: 'Contract Broiler Farming (EC House)', label: 'युरोपियन ईसी शेड कॉन्ट्रॅक्ट ब्रॉयलर फार्मिंग' },
        { value: 'Poultry Feeds / Layer Concentrates', label: 'पोल्ट्री व लेयर कॉन्सन्ट्रेट फीड्स' },
        { value: 'Broiler Chicks & Hatchery', label: 'एकदिवसीय ब्रॉयलर पिल्ले बुकिंग' },
        { value: 'Chicken Feast / QSR Retail', label: 'चिकन फिस्ट रिटेल / आऊटलेट' },
        { value: 'Other Commercial Inquiry', label: 'इतर व्यावसायिक चौकशी' }
      ],
      helplineTitle: 'शेतकरी व ग्राहक हेल्पलाइन',
      helplineTiming: 'सोम - शनि: सकाळी ९:०० ते संध्याकाळी ६:३०',
      emailTitle: 'अधिकृत ईमेल',
      emailSub: 'व्यावसायिक चौकशीसाठी त्वरित प्रतिसाद',
      addressTitle: 'मुख्यालय व स्वयंचलित फीड मिल',
      addressText: 'मु. पो. निरगुडसर, ता. आंबेगाव, जि. पुणे, महाराष्ट्र ४१०५०३, भारत.'
    },
    careers: {
      tag: 'उर्जा समूहात उज्ज्वल करिअर घडवा',
      title: 'उर्जा फुड्समध्ये नोकरीच्या संधी',
      subtitle: 'महाराष्ट्रातील १०,०००+ शेतकऱ्यांच्या समृद्धीसाठी कार्यरत असणाऱ्या २५०+ सहकाऱ्यांच्या उर्जा परिवारात सामील व्हा. युरोपियन तंत्रज्ञान व १५० टन स्वयंचलित फीड मिलिंगमध्ये कामाचा समृद्ध अनुभव मिळवा.',
      whyJoinTitle: 'उर्जा फुड्समध्ये काम का करावे?',
      whyJoinSubtitle: 'ग्रामीण मूल्ये आणि अत्याधुनिक आंतरराष्ट्रीय तंत्रज्ञानाची सांगड घालून आम्ही कर्मचाऱ्यांच्या विकासाला सर्वोच्च प्राधान्य देतो.',
      perks: [
        {
          title: 'शेतकरी सेवेचा आनंद',
          desc: 'पश्चिम महाराष्ट्रातील हजारो शेतकरी बांधवांच्या आर्थिक प्रगतीसाठी प्रत्यक्ष योगदान देण्याची संधी.'
        },
        {
          title: 'अत्याधुनिक तंत्रज्ञानाचा अनुभव',
          desc: 'महाराष्ट्रातील पहिल्या १००% युरोपियन ईसी शेड्स आणि १५० टन कॉम्प्युटराइज्ड फीड मिलवर काम करण्याचा तांत्रिक अनुभव.'
        },
        {
          title: 'उत्कृष्ट वेतन व सुविधा',
          desc: 'स्पर्धात्मक मानधन, पीएफ, ग्रॅच्युइटी, मेडिक्लेम आणि प्लँट कर्मचाऱ्यांसाठी निवासाची उत्तम सोय.'
        },
        {
          title: 'जलद पदोन्नती व करिअर वाढ',
          desc: 'कार्यक्षमतेला सन्मान आणि प्रामाणिक कामाच्या जोरावर व्यवस्थापकीय पदापर्यंत पोहोचण्याची खात्रीशीर संधी.'
        }
      ],
      filterAll: 'सर्व पदे',
      openingsTitle: 'सध्या उपलब्ध असणाऱ्या नोकरीच्या जागा',
      openingsSubtitle: 'पशुवैद्यकीय सेवा, मिलिंग इंजिनिअरिंग, फार्म सुपरव्हिजन, गुणवत्ता नियंत्रण व विक्री विभागातील रिक्त पदांचा तपशील.',
      applyBtn: 'अर्ज करा',
      appliedSuccess: 'आपला अर्ज यशस्वीरीत्या नोंदवला गेला आहे!',
      appliedMsg: 'उर्जा फुड्स परिवारात सामील होण्यासाठी रस दाखवल्याबद्दल धन्यवाद. आमचा एचआर विभाग आपल्या अर्जाची छाननी करून लवकरच संपर्क करेल.',
      form: {
        title: 'नोकरीसाठी थेट अर्ज करा',
        subtitle: 'आपली माहिती खालील फॉर्ममध्ये भरा. थेट उर्जा फुड्सच्या भरती विभागाकडे आपला अर्ज सादर होईल.',
        name: 'पूर्ण नाव *',
        phone: 'मोबाईल नंबर *',
        email: 'ईमेल (पर्यायी)',
        position: 'अर्ज करत असलेले पद *',
        qualification: 'उच्चतम शैक्षणिक पात्रता *',
        experience: 'कामाचा एकूण अनुभव (वर्षे) *',
        location: 'सध्याचे शहर / जिल्हा *',
        resumeText: 'अनुभव / कौशल्ये / बायोडाटा तपशील',
        submit: 'अर्ज सादर करा',
        submitting: 'अर्ज नोंदवला जात आहे...'
      },
      directHrTitle: 'इतर पदांसाठी थेट संपर्क',
      directHrDesc: 'आपल्या शैक्षणिक पात्रतेनुसार योग्य पद वर नमूद नसेल तरीही आपला बायोडाटा थेट आमच्या एचआर विभागाकडे पाठवा.',
      sendCv: 'आपला बायोडाटा पाठवण्यासाठी ईमेल:',
      hrEmail: 'careers@urjafoods.net'
    },
    footer: {
      desc: 'उर्जाची सुरुवात २००५ मध्ये ग्रामीण भागातील शेतकऱ्यांना शाश्वत उत्पन्न मिळवून देण्यासाठी श्री. प्रमोद आनंदराव हिंगे यांनी केली. महाराष्ट्रात १००% युरोपियन ईसी शेड्स आणि १५० टन स्वयंचलित कॉम्प्युटराइज्ड फीड मिलचे अग्रदूत.',
      motto: '२० वर्षांचा विश्वास, आता युरोपियन तंत्रज्ञानासह!',
      quickLinks: 'महत्त्वाच्या लिंक्स',
      featuredProducts: 'प्रमुख उत्पादने',
      plantContact: 'प्लँट व संपर्क',
      capacityInfo: '१५० टन क्षमता • पुणे, अहिल्यानगर, सोलापूर, नाशिक व संपूर्ण पश्चिम महाराष्ट्रभर पुरवठा.',
      rights: 'सर्व हक्क राखीव.',
      backToTop: 'वर जा'
    }
  },

  hi: {
    languageName: 'हिन्दी',
    topBar: {
      helpline: 'किसान एवं ग्राहक हेल्पलाइन',
      email: 'info@urjafoods.net',
      location: 'निरगुडसर, पुणे, महाराष्ट्र',
      motto: '20 वर्षों का विश्वास, अब यूरोपियन तकनीक के साथ!',
      iso: 'आईएसओ प्रमाणित'
    },
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'हमारी सेवाएं',
      products: 'पशु आहार एवं फीड्स',
      brands: 'हमारे ब्रांड्स',
      tech: 'यूरोपियन ईसी तकनीक',
      contact: 'संपर्क',
      careers: 'करियर',
      cta: 'पशु आहार / डीलरशिप पूछताछ'
    },
    hero: {
      slides: [
        {
          badge: 'महाराष्ट्र में पहली बार 100% यूरोपियन तकनीक',
          title: '20 वर्षों का विश्वास, अब यूरोपियन तकनीक के साथ!',
          subtitle: 'महाराष्ट्र में पहली बार उर्जा ने 100% यूरोपियन एनवायरनमेंटल कंट्रोल्ड (EC) शेड्स स्थापित किए हैं। स्वचालित वेंटिलेशन और तापमान नियंत्रण द्वारा एंटीबायोटिक-मुक्त, ताजा और रसीला चिकन तैयार किया जाता है।',
          tagline: 'पोल्ट्री और पशु पोषण में निरंतर नवाचार',
          cta1: 'पशु आहार उत्पाद देखें',
          cta2: 'किसान एवं डीलरशिप पंजीकरण',
          stats: [
            { label: 'यूरोपियन ईसी तकनीक', value: '100%' },
            { label: 'एंटीबायोटिक अवशेष', value: 'शून्य (Zero)' },
            { label: 'स्वचालित टीकाकरण', value: 'उच्च रोग प्रतिरोधकता' }
          ]
        },
        {
          badge: 'उर्जा पशु आहार',
          title: 'उर्जा पशु आहार — ऊर्जा का संपूर्ण स्रोत!',
          subtitle: 'बाईपास फैट, पाचक प्रोटीन और आवश्यक खनिजों से युक्त स्टीम-कुक्ड पेलेट फीड। गाय-भैंसों के दैनिक दूध उत्पादन और फैट/एसएनएफ में निरंतर वृद्धि के लिए वैज्ञानिक पोषण।',
          tagline: 'सुप्रीम गोल्ड 5000 • मलाई प्लस 8000 • मिल्क ओ मिल्क • मैक्स मैजिक',
          cta1: 'पशु आहार सूची देखें',
          cta2: 'आहार ऑर्डर करें',
          stats: [
            { label: 'दूध उत्पादन में वृद्धि', value: '+2 से 3 लीटर' },
            { label: 'फैट और एसएनएफ', value: 'उत्कृष्ट' },
            { label: 'पेलेट पाचन क्षमता', value: 'त्वरित' }
          ]
        },
        {
          badge: 'अत्याधुनिक स्वचालित फीड प्लांट',
          title: '150 टन/दिन पूर्णतः कम्प्यूटरीकृत फीड प्लांट',
          subtitle: 'निरगुडसर (पुणे, महाराष्ट्र) में स्थित। उन्नत कम्प्यूटरीकृत वेइंग, ग्राइंडिंग और पेलेटिंग द्वारा 10,000 से अधिक किसानों को लगातार उच्च गुणवत्ता वाला पोषण उपलब्ध कराया जाता है।',
          tagline: '2005 से किसानों का सशक्तिकरण • संस्थापक: श्री प्रमोद आनंदराव हिंगे',
          cta1: 'उत्पादन क्षमता जानें',
          cta2: 'वितरक बनें',
          stats: [
            { label: 'उत्पादन क्षमता', value: '150 टन/दिन' },
            { label: 'सहभागी किसान', value: '10,000+' },
            { label: 'पुणे नेटवर्क', value: 'अपनी शाखाएं' }
          ]
        }
      ]
    },
    stats: [
      { value: '20+ वर्ष', label: 'विश्वास की विरासत', sublabel: '2005 से किसानों की सेवा में' },
      { value: '150 टन/दिन', label: 'फीड प्लांट क्षमता', sublabel: 'स्वचालित एवं कम्प्यूटरीकृत' },
      { value: '100%', label: 'यूरोपियन ईसी शेड्स', sublabel: 'महाराष्ट्र में पहली बार' },
      { value: '10,000+', label: 'सहभागी किसान', sublabel: 'पश्चिमी महाराष्ट्र भर में' },
      { value: 'शून्य अवशेष', label: 'एंटीबायोटिक-मुक्त', sublabel: 'स्वस्थ एवं स्वादिष्ट चिकन' }
    ],
    about: {
      tag: 'उर्जा फूड्स एंड एग्रो के बारे में',
      title: 'कृषि से जुड़े संस्कार, निरंतर नवाचार का संकल्प',
      p1: 'उर्जा की यात्रा वर्ष 2005 में ग्रामीण किसानों को स्थायी वित्तीय आय प्रदान करने के उद्देश्य से, किसान पृष्ठभूमि के श्री प्रमोद आनंदराव हिंगे द्वारा पशु आहार निर्माण इकाई के साथ शुरू हुई थी।',
      p2: 'हमारे मूल्यों ने हमें हमेशा "निरंतर नवाचार" (Continuous Innovation) सिखाया है। इसी प्रेरणा से उर्जा ने महाराष्ट्र में 100% यूरोपियन एनवायरनमेंटल कंट्रोल्ड (EC) शेड्स स्थापित कर उच्च स्वच्छता और सबसे कम मृत्यु दर का कीर्तिमान स्थापित किया।',
      cardTitle: 'उर्जा की विकास यात्रा (2005 से)',
      cardDesc: 'संस्थापक: श्री प्रमोद आनंदराव हिंगे, निरगुडसर, पुणे।',
      millingBadge: 'स्वचालित पेलेट फीड मिल',
      pillars: [
        {
          title: 'निरंतर नवाचार',
          desc: 'पक्षियों के उत्कृष्ट स्वास्थ्य के लिए महाराष्ट्र में पहली बार 100% यूरोपियन ईसी शेड्स का सफल संचालन।'
        },
        {
          title: 'किसान सशक्तिकरण',
          desc: 'ग्रामीण पशुपालकों और पोल्ट्री किसानों को निश्चित और स्थायी लाभ उपलब्ध कराना।'
        },
        {
          title: 'अटूट गुणवत्ता',
          desc: '150 टन क्षमता वाले कम्प्यूटरीकृत प्लांट से प्रत्येक बैग में प्रमाणित स्टीम-कुक्ड पोषण।'
        },
        {
          title: 'एंटीबायोटिक-मुक्त चिकन',
          desc: 'बायोसुरक्षित वातावरण और स्वचालित टीकाकरण से ग्राहकों के लिए 100% रसायनमुक्त ताजा मांस।'
        }
      ],
      btn1: 'हमारी व्यावसायिक सेवाएं देखें',
      btn2: 'प्रबंधन से संपर्क करें'
    },
    services: {
      tag: 'एकीकृत कृषि समाधान',
      title: 'हमारी मुख्य व्यावसायिक सेवाएं एवं प्रभाग',
      subtitle: 'किसानों के साथ ब्रॉयलर फार्मिंग से लेकर कम्प्यूटरीकृत फीड निर्माण और चिकन फीस्ट आउटलेट्स तक उर्जा की समग्र सेवाएं।',
      inquireBtn: 'पूछताछ करें -',
      items: [
        {
          title: 'कॉन्ट्रैक्ट ब्रॉयलर फार्मिंग',
          tag: 'मुख्य व्यवसाय',
          desc: 'पुणे जिले में अपनी शाखाओं के माध्यम से 100% यूरोपियन ईसी हाउस तकनीक के साथ आधुनिक ब्रॉयलर फार्मिंग, तापमान नियंत्रण और विशेषज्ञ पशु चिकित्सा सहायता।',
          points: ['100% यूरोपियन जलवायु नियंत्रित शेड्स', 'एंटीबायोटिक-मुक्त उत्पादन', 'शाखाओं द्वारा 24/7 चिकित्सा सहायता', 'किसानों के लिए निश्चित लाभ मॉडल']
        },
        {
          title: '150 टन स्वचालित फीड प्लांट',
          tag: 'उत्पादन इकाई',
          desc: 'निरगुडसर, पुणे स्थित अत्याधुनिक कम्प्यूटरीकृत पेलेट फीड प्लांट। गाय, भैंस, ब्रॉयलर और लेयर पक्षियों के लिए लैब-प्रमाणित संतुलित पोषण।',
          points: ['150 टन प्रतिदिन उत्पादन क्षमता', 'स्टीम-कंडीशनिंग तकनीक', 'अत्याधुनिक प्रयोगशाला में परीक्षण', '50 किलो बैग और बल्क में उपलब्ध']
        },
        {
          title: 'आधुनिक हैचरी एवं ब्रॉयलर चूजे',
          tag: 'उत्कृष्ट ब्रीडिंग',
          desc: 'स्वचालित इन-ओवो और स्प्रे टीकाकरण सुविधा से युक्त स्वस्थ एक-दिवसीय चूजों का उत्पादन, जिससे उच्च रोग प्रतिरोधकता और कम मृत्यु दर मिलती है।',
          points: ['स्वचालित टीकाकरण प्रणाली', 'अत्यंत कम मृत्यु दर अनुपात', 'एकसमान वजन और फुर्तीले चूजे', 'रोगों के प्रति उच्च प्रतिरोधक क्षमता']
        },
        {
          title: 'चिकन फीस्ट / क्यूएसआर आउटलेट्स',
          tag: 'खुदरा बिक्री',
          desc: 'सीधे हमारे पर्यावरण-नियंत्रित फार्म्स से उपभोक्ताओं को ताजा, स्वादिष्ट, रसीला और एंटीबायोटिक-मुक्त चिकन कोल्ड-चेन द्वारा पहुंचाया जाता है।',
          points: ['शून्य रासायनिक अवशेष', 'मुलायम, रसीला और स्वच्छ मांस', 'पुणे व मुंबई में सीधी आपूर्ति', 'शीर्ष ब्रांड्स का भरोसा']
        },
        {
          title: 'उर्जा संतुलित पशु आहार',
          tag: 'दुग्ध व्यवसाय पोषण',
          desc: 'दुधारू पशुओं के लिए (सुप्रीम गोल्ड, मलाई प्लस, मिल्क ओ मिल्क, मैक्स मैजिक, काल्फ स्टार्टर) दूध उत्पादन और फैट बढ़ाने वाला पेलेट आहार।',
          points: ['दूध उत्पादन में उल्लेखनीय वृद्धि', 'बाईपास फैट व खनिजों का मिश्रण', 'पशुओं की पाचन शक्ति में सुधार', 'स्वादिष्ट और आसानी से खाने योग्य पेलेट्स']
        }
      ]
    },
    products: {
      tag: 'ऊर्जा का संपूर्ण स्रोत',
      title: 'उर्जा पशु आहार एवं फीड्स कैटलॉग',
      subtitle: 'निरगुडसर, पुणे स्थित अत्याधुनिक 150 टन स्वचालित कम्प्यूटरीकृत प्लांट में निर्मित। आवश्यक अमीनो एसिड, बाईपास फैट और सूक्ष्म खनिजों से भरपूर।',
      categories: {
        all: 'सभी उत्पाद (All)',
        cattle: 'पशु आहार (Cattle Feed)',
        poultry: 'ब्रॉयलर एवं देसी फीड (Poultry)',
        layer: 'लेयर कॉन्सन्ट्रेट एवं प्री-मिक्स'
      },
      viewSpecs: 'विवरण',
      bookQuote: 'मूल्य / बुकिंग करें',
      modalTitle: 'प्रयोगशाला प्रमाणित पोषण तत्व:',
      modalBenefits: 'किसानों के लिए मुख्य लाभ:',
      modalCta: 'इस उत्पाद के लिए कोटेशन मांगें',
      modalClose: 'बंद करें'
    },
    brands: {
      tag: 'अग्रणी ब्रांड पोर्टफोलियो',
      title: 'हमारे प्रतिष्ठित ब्रांड्स एवं उत्पाद',
      subtitle: 'पुणे, अहिल्यानगर, सोलापुर और पूरे पश्चिमी महाराष्ट्र के 10,000 से अधिक डेयरी व पोल्ट्री किसानों का अटूट भरोसा।',
      verified: 'प्रमाणित गुणवत्ता मानक'
    },
    technology: {
      badge: 'महाराष्ट्र में पहली बार यूरोपियन मानक',
      title: '100% यूरोपियन एनवायरनमेंटल कंट्रोल्ड (EC) शेड्स',
      subtitle: 'महाराष्ट्र में पहली बार उर्जा फूड्स ने यूरोपियन मानकों के स्वचालित ईसी शेड्स स्थापित किए। जलवायु नियंत्रण से पक्षी स्वाभाविक रूप से स्वस्थ बढ़ते हैं और बिना दवाओं के पौष्टिक मांस मिलता है।',
      features: [
        {
          title: 'स्वचालित टनल वेंटिलेशन',
          desc: 'नेगेटिव प्रेशर टनल पंखे निरंतर ताजी हवा बनाए रखते हैं, जिससे हर मौसम में आदर्श ऑक्सीजन और आर्द्रता बनी रहती है।'
        },
        {
          title: 'माइक्रो-क्लाइमेट तापमान नियंत्रण',
          desc: 'कम्प्यूटरीकृत सेंसर कूलिंग पैड्स और हीटिंग को नियंत्रित करते हैं, जिससे भीषण गर्मी में भी पक्षियों को तनाव नहीं होता।'
        },
        {
          title: '100% एंटीबायोटिक-मुक्त चिकन',
          desc: 'अत्यंत स्वच्छ और रोगाणुमुक्त वातावरण के कारण पक्षियों को निवारक एंटीबायोटिक देने की आवश्यकता नहीं होती।'
        },
        {
          title: 'स्वचालित टीकाकरण हैचरी',
          desc: 'अत्याधुनिक हैचरी यूनिट में स्प्रे एवं स्वचालित टीकाकरण से चूजों को जन्म से ही मजबूत रोग प्रतिरोधकता प्राप्त होती है।'
        }
      ],
      cta: 'उर्जा के साथ यूरोपियन ईसी कॉन्ट्रैक्ट फार्मिंग शुरू करें',
      stats: [
        { label: 'नियंत्रित तापमान', value: '22°C - 24°C' },
        { label: 'कम मृत्यु दर', value: '<2.5%' },
        { label: 'लक्ष्य एफसीआर (FCR)', value: '1.5 - 1.6' }
      ]
    },
    contact: {
      tag: 'उर्जा फूड्स से संपर्क करें',
      title: 'पशु आहार बुकिंग एवं डीलरशिप पूछताछ',
      desc: 'चाहे आप उच्च उत्पादन हेतु उर्जा पशु आहार चाहते हों, नई डीलरशिप शुरू करना चाहते हों या यूरोपियन ईसी कॉन्ट्रैक्ट फार्मिंग से जुड़ना चाहते हों, हमारी टीम आपकी सेवा में तैयार है।',
      formTitle: 'सीधी पूछताछ एवं डीलरशिप फॉर्म',
      formDesc: 'नीचे अपना विवरण भरें। पुणे मुख्यालय से हमारे प्रतिनिधि आपसे शीघ्र संपर्क करेंगे।',
      labels: {
        name: 'पूरा नाम *',
        phone: 'मोबाइल नंबर *',
        email: 'ईमेल आईडी (वैकल्पिक)',
        location: 'गाँव / तालुका / जिला',
        category: 'पूछताछ की श्रेणी',
        message: 'अपनी आवश्यकता या संदेश',
        submit: 'उर्जा फूड्स में दर्ज करें',
        submitting: 'दर्ज हो रहा है...'
      },
      categories: [
        { value: 'Cattle Feed / Pashu Aahar', label: 'पशु आहार (सुप्रीम गोल्ड, मलाई प्लस, मिल्क ओ मिल्क)' },
        { value: 'Dealership / Distributorship', label: 'डीलरशिप / वितरक आवेदन' },
        { value: 'Contract Broiler Farming (EC House)', label: 'यूरोपियन ईसी शेड कॉन्ट्रैक्ट ब्रॉयलर फार्मिंग' },
        { value: 'Poultry Feeds / Layer Concentrates', label: 'पोल्ट्री व लेयर कॉन्सन्ट्रेट फीड्स' },
        { value: 'Broiler Chicks & Hatchery', label: 'एक-दिवसीय ब्रॉयलर चूजे बुकिंग' },
        { value: 'Chicken Feast / QSR Retail', label: 'चिकन फीस्ट रिटेल / आउटलेट' },
        { value: 'Other Commercial Inquiry', label: 'अन्य व्यावसायिक पूछताछ' }
      ],
      helplineTitle: 'किसान एवं ग्राहक हेल्पलाइन',
      helplineTiming: 'सोम - शनि: सुबह 9:00 से शाम 6:30 बजे तक',
      emailTitle: 'आधिकारिक ईमेल',
      emailSub: 'व्यावसायिक पूछताछ का त्वरित उत्तर',
      addressTitle: 'मुख्यालय एवं स्वचालित फीड मिल',
      addressText: 'मु. पो. निरगुडसर, ता. आंबेगांव, जिला पुणे, महाराष्ट्र 410503, भारत।'
    },
    careers: {
      tag: 'उर्जा परिवार के साथ उज्ज्वल भविष्य',
      title: 'उर्जा फूड्स में करियर के अवसर',
      subtitle: 'महाराष्ट्र के 10,000+ किसानों की समृद्धि में योगदान देने वाली 250+ सदस्यों की उर्जा टीम में शामिल हों। यूरोपियन तकनीक और स्वचालित फीड प्लांट में काम का उत्कृष्ट अनुभव प्राप्त करें।',
      whyJoinTitle: 'उर्जा फूड्स में करियर क्यों चुनें?',
      whyJoinSubtitle: 'हम ग्रामीण संस्कृति और वैश्विक कृषि तकनीक का संयोजन करते हुए कर्मचारियों के सर्वांगीण विकास को प्राथमिकता देते हैं।',
      perks: [
        {
          title: 'उद्देश्यपूर्ण कार्य',
          desc: 'पश्चिम महाराष्ट्र के हजारों किसानों की आजीविका को सुदृढ़ करने का संतोष।'
        },
        {
          title: 'आधुनिक यूरोपियन तकनीक',
          desc: '100% यूरोपियन ईसी पोल्ट्री शेड्स और 150 टन स्वचालित फीड मिल में कार्य अनुभव।'
        },
        {
          title: 'आकर्षक वेतन एवं सुविधाएं',
          desc: 'प्रतिस्पर्धी वेतन, पीएफ, स्वास्थ्य बीमा, इंसेंटिव एवं तकनीकी स्टाफ के लिए आवास सुविधा।'
        },
        {
          title: 'तीव्र पदोन्नति के अवसर',
          desc: 'योग्यता और निष्ठा के आधार पर नेतृत्वकारी भूमिकाओं में तरक्की के खुले रास्ते।'
        }
      ],
      filterAll: 'सभी पद',
      openingsTitle: 'उपलब्ध पदों की सूची',
      openingsSubtitle: 'पशु चिकित्सा, प्लांट इंजीनियरिंग, फार्म संचालन, गुणवत्ता नियंत्रण और बिक्री विभाग में रिक्तियां।',
      applyBtn: 'आवेदन करें',
      appliedSuccess: 'आपका आवेदन सफलतापूर्वक प्राप्त हुआ!',
      appliedMsg: 'उर्जा फूड्स में रुचि दिखाने के लिए धन्यवाद। हमारा एचआर विभाग शीघ्र ही आपसे संपर्क करेगा।',
      form: {
        title: 'सीधे नौकरी के लिए आवेदन करें',
        subtitle: 'अपनी जानकारी भरें। आपका विवरण उर्जा फूड्स भर्ती टीम के पास सुरक्षित दर्ज होगा।',
        name: 'पूरा नाम *',
        phone: 'मोबाइल नंबर *',
        email: 'ईमेल',
        position: 'पद जिसके लिए आवेदन कर रहे हैं *',
        qualification: 'शैक्षणिक योग्यता *',
        experience: 'अनुभव (वर्ष) *',
        location: 'वर्तमान शहर / जिला *',
        resumeText: 'कौशल / अनुभव विवरण',
        submit: 'आवेदन सबमिट करें',
        submitting: 'सबमिट हो रहा है...'
      },
      directHrTitle: 'अन्य पदों के लिए संपर्क',
      directHrDesc: 'यदि आपकी योग्यता के अनुरूप पद ऊपर सूचीबद्ध नहीं है, तो भी अपना सीवी हमारे एचआर को ईमेल करें।',
      sendCv: 'सीवी भेजने के लिए ईमेल:',
      hrEmail: 'careers@urjafoods.net'
    },
    footer: {
      desc: 'उर्जा की शुरुआत 2005 में ग्रामीण किसानों को स्थायी आय प्रदान करने के लिए श्री प्रमोद आनंदराव हिंगे द्वारा की गई थी। महाराष्ट्र में 100% यूरोपियन ईसी शेड्स और 150 टन स्वचालित कम्प्यूटरीकृत फीड मिल के प्रणेता।',
      motto: '20 वर्षों का विश्वास, अब यूरोपियन तकनीक के साथ!',
      quickLinks: 'त्वरित लिंक्स',
      featuredProducts: 'प्रमुख उत्पाद',
      plantContact: 'प्लांट एवं संपर्क',
      capacityInfo: '150 टन क्षमता • पुणे, अहिल्यानगर, सोलापुर, नासिक एवं पूरे पश्चिमी महाराष्ट्र में आपूर्ति।',
      rights: 'सर्वाधिकार सुरक्षित।',
      backToTop: 'ऊपर जाएं'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('urja_lang') || 'mr'; // Default to Marathi, local language of Maharashtra
  });

  useEffect(() => {
    localStorage.setItem('urja_lang', language);
  }, [language]);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
