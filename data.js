window.NEET_PG_DEMO_CONFIG = {
  examTitle: "NEET PG 2026 Demo Exam",
  totalSections: 5,
  questionsPerSection: 36,
  sectionDurationSeconds: 42 * 60,
  marking: {
    correct: 4,
    wrong: -1,
    unattempted: 0
  },
  sections: [
    "Medicine and Allied",
    "Surgery and Allied",
    "Obstetrics, Gynaecology and Paediatrics",
    "Pre-Clinical Subjects",
    "Para-Clinical Subjects"
  ],
  videoCases: [
    {
      title: "Video case: Lung ultrasound clip",
      src: "assets/video-cases/lung-ultrasound.webm",
      posterText: "Lung Ultrasound Video Case",
      source: "Wikimedia Commons, served locally",
      question: {
        subject: "Medicine",
        stem: "On lung ultrasound, multiple vertical comet-tail artifacts arising from the pleural line are best described as:",
        options: ["A-lines", "B-lines", "Lung point", "Barcode sign"],
        answer: 1,
        explanation: "B-lines are vertical reverberation artifacts arising from the pleural line and are used in interstitial syndrome assessment."
      }
    },
    {
      title: "Video case: Human kidney ultrasound scan",
      src: "assets/video-cases/kidney-ultrasound.webm",
      posterText: "Kidney Ultrasound Video Case",
      source: "Wikimedia Commons, served locally",
      question: {
        subject: "Surgery",
        stem: "A renal ultrasound video is shown. Which finding is most suggestive of hydronephrosis?",
        options: ["Uniformly echogenic renal sinus only", "Dilatation of renal pelvis and calyces", "Posterior acoustic shadow from ribs", "Small simple cortical cyst only"],
        answer: 1,
        explanation: "Hydronephrosis is seen as dilatation of the renal pelvis and calyceal system."
      }
    },
    {
      title: "Video case: Fetal movement on 3D ultrasound",
      src: "assets/video-cases/fetal-movement.webm",
      posterText: "Fetal Ultrasound Video Case",
      source: "Wikimedia Commons, served locally",
      question: {
        subject: "Obstetrics",
        stem: "The fetal ultrasound video demonstrates fetal movement. In routine obstetric practice, ultrasound is useful for all except:",
        options: ["Assessment of fetal viability", "Placental localization", "Determination of fetal presentation", "Definitive diagnosis of fetal chromosomal karyotype without sampling"],
        answer: 3,
        explanation: "Ultrasound can suggest anomalies or markers, but definitive fetal karyotype requires genetic sampling/testing."
      }
    },
    {
      title: "Video case: Ultrasound imaging principle",
      src: "assets/video-cases/kidney-ultrasound.webm",
      posterText: "Ultrasound Physics Video Case",
      source: "Wikimedia Commons, served locally",
      question: {
        subject: "Physiology",
        stem: "The ultrasound video demonstrates real-time imaging. The transducer primarily works on which physical principle?",
        options: ["Photoelectric effect", "Piezoelectric effect", "Doppler-only electrical discharge", "Magnetic resonance"],
        answer: 1,
        explanation: "Ultrasound transducers use the piezoelectric effect to convert electrical energy into sound waves and received echoes back into electrical signals."
      }
    },
    {
      title: "Video case: Fetal ultrasound clip",
      src: "assets/video-cases/fetal-movement.webm",
      posterText: "Fetal Ultrasound Anatomy Case",
      source: "Wikimedia Commons, served locally",
      question: {
        subject: "Anatomy",
        stem: "The fetal ultrasound clip is shown. Which germ layer gives rise to the central nervous system?",
        options: ["Endoderm", "Mesoderm", "Ectoderm", "Extraembryonic trophoblast"],
        answer: 2,
        explanation: "The central nervous system develops from neuroectoderm."
      }
    }
  ],
  questionBank: [
    {
      subject: "Medicine",
      stem: "A 58-year-old man with central chest pain has ST elevation in leads II, III and aVF. Which coronary artery is most commonly involved?",
      options: ["Left anterior descending artery", "Right coronary artery", "Left circumflex artery", "Left main coronary artery"],
      answer: 1,
      explanation: "Inferior wall myocardial infarction is most often due to right coronary artery occlusion."
    },
    {
      subject: "Medicine",
      stem: "A patient with fever, neck stiffness and altered sensorium has Gram-positive lancet-shaped diplococci in CSF. What is the likely organism?",
      options: ["Neisseria meningitidis", "Streptococcus pneumoniae", "Haemophilus influenzae", "Listeria monocytogenes"],
      answer: 1,
      explanation: "Pneumococcus is Gram-positive, lancet-shaped and commonly causes adult bacterial meningitis."
    },
    {
      subject: "Medicine",
      stem: "Which drug is first-line for termination of stable narrow-complex paroxysmal supraventricular tachycardia?",
      options: ["Amiodarone", "Adenosine", "Lidocaine", "Digoxin"],
      answer: 1,
      explanation: "Adenosine transiently blocks AV nodal conduction and terminates most AVNRT episodes."
    },
    {
      subject: "Medicine",
      stem: "A diabetic patient has fruity breath, deep breathing, high anion gap acidosis and ketonemia. What is the immediate fluid of choice?",
      options: ["5% dextrose", "0.9% normal saline", "3% hypertonic saline", "Ringer lactate with insulin only"],
      answer: 1,
      explanation: "Initial management of diabetic ketoacidosis starts with isotonic saline resuscitation."
    },
    {
      subject: "Medicine",
      stem: "Which antibody is most specific for systemic lupus erythematosus?",
      options: ["Anti-centromere", "Anti-dsDNA", "Anti-Jo-1", "Anti-CCP"],
      answer: 1,
      explanation: "Anti-dsDNA is highly specific for SLE and correlates with lupus nephritis activity."
    },
    {
      subject: "Medicine",
      stem: "A young patient with episodic wheeze improves after salbutamol. Which spirometry change supports asthma?",
      options: ["Reduced DLCO only", "FEV1 increase by at least 12% and 200 mL", "Fixed low FEV1/FVC without reversibility", "Normal peak flow variability"],
      answer: 1,
      explanation: "Significant bronchodilator reversibility supports asthma."
    },
    {
      subject: "Surgery",
      stem: "A patient develops severe epigastric pain radiating to the back with raised serum lipase. Which scoring system is commonly used for acute pancreatitis severity?",
      options: ["Child-Pugh score", "Ranson score", "MELD score", "APGAR score"],
      answer: 1,
      explanation: "Ranson criteria are used to assess acute pancreatitis severity."
    },
    {
      subject: "Surgery",
      stem: "A painless progressive obstructive jaundice with a palpable gallbladder suggests which diagnosis?",
      options: ["Acute viral hepatitis", "Carcinoma head of pancreas", "Choledocholithiasis with cholangitis", "Hemolytic jaundice"],
      answer: 1,
      explanation: "Courvoisier sign classically suggests malignant obstruction such as carcinoma head of pancreas."
    },
    {
      subject: "Surgery",
      stem: "Which hernia passes through the deep inguinal ring, inguinal canal and may enter the scrotum?",
      options: ["Direct inguinal hernia", "Indirect inguinal hernia", "Femoral hernia", "Obturator hernia"],
      answer: 1,
      explanation: "Indirect inguinal hernia follows the pathway of the processus vaginalis."
    },
    {
      subject: "Surgery",
      stem: "The most common site of peptic ulcer perforation is:",
      options: ["Posterior wall of stomach", "First part of duodenum anterior wall", "Second part of duodenum", "Lesser curvature of stomach"],
      answer: 1,
      explanation: "Anterior wall of the first part of duodenum is the commonest perforation site."
    },
    {
      subject: "Surgery",
      stem: "A thyroid swelling moves with deglutition because it is attached to which structure?",
      options: ["Sternocleidomastoid", "Pretracheal fascia", "Platysma", "Carotid sheath"],
      answer: 1,
      explanation: "The thyroid gland is enclosed by pretracheal fascia, causing movement on swallowing."
    },
    {
      subject: "Surgery",
      stem: "Which investigation is most appropriate first-line imaging in suspected gallstones?",
      options: ["MRCP", "Ultrasonography abdomen", "ERCP", "Barium meal follow-through"],
      answer: 1,
      explanation: "Ultrasound is the initial imaging test of choice for gallstones."
    },
    {
      subject: "Obstetrics",
      stem: "A pregnant woman at 32 weeks has hypertension, proteinuria and headache. Which condition is most likely?",
      options: ["Gestational diabetes", "Preeclampsia", "Ectopic pregnancy", "Placenta previa"],
      answer: 1,
      explanation: "Hypertension after 20 weeks with proteinuria and symptoms suggests preeclampsia."
    },
    {
      subject: "Obstetrics",
      stem: "Which is the most common cause of postpartum hemorrhage?",
      options: ["Genital tract trauma", "Uterine atony", "Retained placenta", "Coagulation failure"],
      answer: 1,
      explanation: "Uterine atony is the commonest cause of postpartum hemorrhage."
    },
    {
      subject: "Gynaecology",
      stem: "A woman with infertility has dysmenorrhea, dyspareunia and chocolate cyst on ultrasound. Diagnosis?",
      options: ["PCOS", "Endometriosis", "Adenomyosis", "PID"],
      answer: 1,
      explanation: "Endometriosis commonly causes pain, infertility and ovarian endometrioma."
    },
    {
      subject: "Paediatrics",
      stem: "A child with barking cough, inspiratory stridor and steeple sign on X-ray most likely has:",
      options: ["Epiglottitis", "Croup", "Foreign body aspiration", "Bronchiolitis"],
      answer: 1,
      explanation: "Croup presents with barking cough, stridor and subglottic narrowing."
    },
    {
      subject: "Paediatrics",
      stem: "Which vaccine is given at birth in the National Immunization Schedule of India?",
      options: ["DPT booster", "BCG", "MMR", "Typhoid conjugate vaccine"],
      answer: 1,
      explanation: "BCG is administered at birth or as early as possible."
    },
    {
      subject: "Paediatrics",
      stem: "A neonate has excessive salivation, choking on feeds and inability to pass nasogastric tube. Diagnosis?",
      options: ["Pyloric stenosis", "Tracheoesophageal fistula", "Hirschsprung disease", "Meconium ileus"],
      answer: 1,
      explanation: "These are classic features of esophageal atresia with tracheoesophageal fistula."
    },
    {
      subject: "Anatomy",
      stem: "Which nerve is injured in wrist drop after fracture shaft of humerus?",
      options: ["Median nerve", "Radial nerve", "Ulnar nerve", "Axillary nerve"],
      answer: 1,
      explanation: "The radial nerve runs in the spiral groove and is vulnerable in humeral shaft fracture."
    },
    {
      subject: "Anatomy",
      stem: "Which structure passes through the greater sciatic foramen below piriformis?",
      options: ["Superior gluteal nerve", "Sciatic nerve", "Femoral nerve", "Obturator nerve"],
      answer: 1,
      explanation: "The sciatic nerve exits the pelvis below piriformis."
    },
    {
      subject: "Anatomy",
      stem: "Which muscle is the chief abductor of the shoulder from 15 to 90 degrees?",
      options: ["Supraspinatus", "Deltoid", "Infraspinatus", "Subscapularis"],
      answer: 1,
      explanation: "Deltoid is the chief abductor after supraspinatus initiates abduction."
    },
    {
      subject: "Physiology",
      stem: "Which phase of the cardiac cycle corresponds to closure of the mitral and tricuspid valves?",
      options: ["Rapid filling", "Isovolumetric contraction", "Reduced ejection", "Atrial systole"],
      answer: 1,
      explanation: "AV valve closure marks the start of isovolumetric contraction."
    },
    {
      subject: "Physiology",
      stem: "The oxygen dissociation curve shifts to the right in which condition?",
      options: ["Hypothermia", "Increased 2,3-BPG", "Decreased PCO2", "Alkalosis"],
      answer: 1,
      explanation: "Increased 2,3-BPG reduces hemoglobin affinity and shifts the curve right."
    },
    {
      subject: "Physiology",
      stem: "Which hormone increases free water reabsorption in the collecting duct?",
      options: ["Aldosterone", "ADH", "ANP", "PTH"],
      answer: 1,
      explanation: "ADH inserts aquaporin-2 channels in collecting ducts."
    },
    {
      subject: "Biochemistry",
      stem: "Deficiency of which enzyme causes phenylketonuria?",
      options: ["Tyrosinase", "Phenylalanine hydroxylase", "Homogentisate oxidase", "Branched-chain ketoacid dehydrogenase"],
      answer: 1,
      explanation: "Classic PKU is due to phenylalanine hydroxylase deficiency."
    },
    {
      subject: "Biochemistry",
      stem: "Which vitamin deficiency causes megaloblastic anemia with neurological manifestations?",
      options: ["Folate", "Vitamin B12", "Vitamin C", "Vitamin K"],
      answer: 1,
      explanation: "Vitamin B12 deficiency causes megaloblastic anemia and neurologic deficits."
    },
    {
      subject: "Biochemistry",
      stem: "Rate-limiting enzyme of cholesterol synthesis is:",
      options: ["Acetyl-CoA carboxylase", "HMG-CoA reductase", "Pyruvate kinase", "Carnitine acyltransferase I"],
      answer: 1,
      explanation: "HMG-CoA reductase is the statin target and rate-limiting enzyme."
    },
    {
      subject: "Pathology",
      stem: "Caseous necrosis is classically seen in:",
      options: ["Myocardial infarction", "Tuberculosis", "Acute pancreatitis", "Brain infarct"],
      answer: 1,
      explanation: "Tuberculous granulomas classically show caseous necrosis."
    },
    {
      subject: "Pathology",
      stem: "Reed-Sternberg cells are characteristic of:",
      options: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Multiple myeloma", "Burkitt lymphoma"],
      answer: 1,
      explanation: "Reed-Sternberg cells are diagnostic cells in Hodgkin lymphoma."
    },
    {
      subject: "Pathology",
      stem: "Which tumor marker is associated with hepatocellular carcinoma?",
      options: ["CEA", "Alpha-fetoprotein", "CA-125", "PSA"],
      answer: 1,
      explanation: "AFP is a marker for hepatocellular carcinoma and yolk sac tumor."
    },
    {
      subject: "Pharmacology",
      stem: "Which antibiotic commonly causes red man syndrome?",
      options: ["Gentamicin", "Vancomycin", "Azithromycin", "Doxycycline"],
      answer: 1,
      explanation: "Rapid vancomycin infusion can cause histamine-mediated red man syndrome."
    },
    {
      subject: "Pharmacology",
      stem: "Which drug is an antidote for organophosphorus poisoning?",
      options: ["Naloxone", "Atropine with pralidoxime", "Flumazenil", "N-acetylcysteine"],
      answer: 1,
      explanation: "Atropine controls muscarinic effects and pralidoxime regenerates acetylcholinesterase."
    },
    {
      subject: "Pharmacology",
      stem: "Which anti-TB drug is associated with optic neuritis?",
      options: ["Isoniazid", "Ethambutol", "Rifampicin", "Pyrazinamide"],
      answer: 1,
      explanation: "Ethambutol can cause dose-related optic neuritis."
    },
    {
      subject: "Microbiology",
      stem: "Which organism causes rice-water stool in severe watery diarrhea?",
      options: ["Shigella dysenteriae", "Vibrio cholerae", "Entamoeba histolytica", "Campylobacter jejuni"],
      answer: 1,
      explanation: "Vibrio cholerae causes profuse rice-water stools."
    },
    {
      subject: "Microbiology",
      stem: "Which stain is used for Mycobacterium tuberculosis?",
      options: ["Gram stain", "Ziehl-Neelsen stain", "India ink", "Albert stain"],
      answer: 1,
      explanation: "Acid-fast bacilli are demonstrated by Ziehl-Neelsen staining."
    },
    {
      subject: "Microbiology",
      stem: "Which virus is most strongly associated with cervical carcinoma?",
      options: ["HSV-1", "HPV 16 and 18", "EBV", "CMV"],
      answer: 1,
      explanation: "High-risk HPV types 16 and 18 are strongly associated with cervical cancer."
    },
    {
      subject: "PSM",
      stem: "Incidence measures:",
      options: ["Existing cases at a point", "New cases in a population over time", "Mortality among diseased only", "False positives in screening"],
      answer: 1,
      explanation: "Incidence is the occurrence of new cases over a specified period."
    },
    {
      subject: "PSM",
      stem: "The best measure of association in a cohort study is:",
      options: ["Odds ratio", "Relative risk", "Attributable risk percent only", "P value"],
      answer: 1,
      explanation: "Relative risk is directly estimated in cohort studies."
    },
    {
      subject: "Forensic Medicine",
      stem: "Cherry-red postmortem lividity is classically seen in poisoning by:",
      options: ["Organophosphorus", "Carbon monoxide", "Arsenic", "Lead"],
      answer: 1,
      explanation: "Carboxyhemoglobin gives cherry-red discoloration in carbon monoxide poisoning."
    },
    {
      subject: "ENT",
      stem: "Most common cause of conductive hearing loss in children is:",
      options: ["Otosclerosis", "Otitis media with effusion", "Presbycusis", "Acoustic neuroma"],
      answer: 1,
      explanation: "Glue ear is a common cause of conductive hearing loss in children."
    },
    {
      subject: "Ophthalmology",
      stem: "A patient has painful red eye, halos around lights and mid-dilated fixed pupil. Diagnosis?",
      options: ["Conjunctivitis", "Acute angle-closure glaucoma", "Uveitis", "Retinal detachment"],
      answer: 1,
      explanation: "Acute angle-closure glaucoma is an ophthalmic emergency."
    },
    {
      subject: "Dermatology",
      stem: "Auspitz sign is seen in:",
      options: ["Lichen planus", "Psoriasis", "Pemphigus vulgaris", "Tinea corporis"],
      answer: 1,
      explanation: "Pinpoint bleeding on removing scales is Auspitz sign in psoriasis."
    },
    {
      subject: "Psychiatry",
      stem: "First-line pharmacological treatment for obsessive compulsive disorder is:",
      options: ["Lithium", "SSRI", "Haloperidol only", "Benzodiazepine only"],
      answer: 1,
      explanation: "SSRIs are first-line drugs for OCD."
    },
    {
      subject: "Radiology",
      stem: "Best initial imaging for acute head injury with suspected intracranial bleed is:",
      options: ["MRI brain", "Non-contrast CT head", "PET scan", "Skull X-ray only"],
      answer: 1,
      explanation: "Non-contrast CT rapidly detects acute intracranial hemorrhage."
    },
    {
      subject: "Anaesthesia",
      stem: "Which agent is used for rapid sequence induction and has bronchodilatory properties?",
      options: ["Thiopentone", "Ketamine", "Etomidate", "Propofol"],
      answer: 1,
      explanation: "Ketamine preserves airway reflexes relatively and causes bronchodilation."
    },
    {
      subject: "Orthopaedics",
      stem: "Avascular necrosis of femoral head is a known complication of fracture of:",
      options: ["Intertrochanteric femur", "Neck of femur", "Tibia shaft", "Fibula neck"],
      answer: 1,
      explanation: "Intracapsular neck femur fractures can disrupt retinacular blood supply."
    }
  ]
};
