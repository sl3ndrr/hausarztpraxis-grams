/**
 * Alle erlaubten Bild-URLs und reservierten Layoutmaße.
 * Eingaben: Praxisbilder aus dem Projektauftrag; Namen aus practice/team.
 * Bildausschnitt und URLs hier ändern; Ausgabe nur über picture.js (Favicon/OG ausgenommen).
 * @typedef {{src:string,alt:string,width:number,height:number,initials:string,objectPosition?:string}} ImageData
 */
import { practice } from './practice.js';
import { teamNames } from './team.js';
export const imageFallback = { alt: 'Praxisteam', width: 200, height: 267, initials: 'PT' };
export const images = {
  hero: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/2023-12-27%20(2).jpg', alt: 'Titelbild der Hausarztpraxis', width: 1600, height: 900, initials: 'HG', objectPosition: 'center' },
  university: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/.640px-Universita%CC%88tsmedizin_der_Johannes_Gutenberg-Universita%CC%88t_Mainz_Logo.svg.png/picture-200?_=1914220b348', alt: 'Logo der Universitätsmedizin Mainz', width: 200, height: 80, initials: 'UM' },
  doctorHome: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.IMG_0931-EDIT.jpg/picture-200?_=192a91d1eb8', alt: `Porträt von ${practice.doctor}`, width: 200, height: 267, initials: 'OG' },
  doctor: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.IMG_0931.jpg/picture-200?_=192a91f7085', alt: `Porträt von ${practice.doctor}`, width: 200, height: 267, initials: 'OG' },
  tatjana: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.IMG_0952-EDIT.jpg/picture-200?_=192a96c8f97', alt: `Porträt von ${teamNames.tatjana}`, width: 200, height: 267, initials: 'TR' },
  ebru: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.IMG_0961-EDIT.jpg/picture-200?_=192a8feae20', alt: `Porträt von ${teamNames.ebru}`, width: 200, height: 267, initials: 'EZ' },
  constance: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.IMG-20260808-WA0007~2.jpg/picture-200?_=19fe28922d0', alt: `Porträt von ${teamNames.constance}`, width: 200, height: 267, initials: 'CG' },
  leonard: { src: 'https://hausarztpraxis-grams.de/.cm4all/uproc.php/0/Webseitenmedien/Portraits/.signal-2025-04-19-142612_002.jpeg/picture-200?_=1964e1bbb3b', alt: `Porträt von ${teamNames.leonard}`, width: 200, height: 267, initials: 'LG' },
  favicon: { src: 'https://hausarztpraxis-grams.de/.cm4all/sysdb/favicon/icon-150x150_32e59d5.png', alt: 'Praxis-Symbol', width: 150, height: 150, initials: 'HG' }
};
