const lineYarn: Record<string, string> = {
  "Yaan A Ra Le": "https://line.me/ti/g/bazRb8w-4U",
  "Yaan Alligator": "https://line.me/ti/g/FSvmbhuadF",
  "Yaan Among Us": "https://line.me/ti/g/FcTeLqMSXW",
  "Yaan Aquarium": "https://line.me/ti/g/b68a9-NHK3",
  "Yaan Anacondi": "https://line.me/ti/g/7ZtRpUtkUQ",
  "Yaan Amazon": "https://line.me/ti/g/smQf7tW4eL",
  "Yaan Apo": "https://line.me/ti/g/4hgkjzD3RH",
  "Yaan Ahan Tam Sang": "https://line.me/ti/g/AZJJLYLNpL",
  "Yaan Atai Dam Dan": "https://line.me/ti/g/CH5VQdLpNe",
  "Yaan Aso Beso": "https://line.me/ti/g/C6nJb4NELA",
  "Yaan Aram Sam Sam": "https://line.me/ti/g/HmkFuZZF5n",
  "Yaan Apaca": "https://line.me/ti/g/2ZkYE35pbL",
  "Yaan Atra Smooth": "https://line.me/ti/g/Ytg4q8f_bB",
  "Yaan Avenger": "https://line.me/ti/g/9XtLp2UvbY",
  "Yaan Arigato": "https://line.me/ti/g/wT9cCBEvSm",
  "Yaan Araya": "https://line.me/ti/g/EbmSWBLLLR",
  "Yaan Asun": "https://line.me/ti/g/YP8-k4NXsP",
  "Yaan Ayoy": "https://line.me/ti/g/4fgvtPHVhr",
}

export const mapYaanToLineLink = (yaan: string) => {
  return lineYarn[yaan] ?? ""
}
