// Obszar działania (Etap 5, 2026-11-20). Ta sama lista jest w backendzie (_car_keys_data.py).
export const AREA_KRAKOW_DISTRICTS = [
	"Stare Miasto",
	"Krowodrza",
	"Bronowice",
	"Azory",
	"Prądnik Biały",
	"Prądnik Czerwony",
	"Zwierzyniec",
	"Dębniki",
	"Ruczaj",
	"Łagiewniki",
	"Borek Fałęcki",
	"Podgórze",
	"Wola Duchacka",
	"Bieżanów",
	"Prokocim",
	"Czyżyny",
	"Mistrzejowice",
	"Bieńczyce",
	"Nowa Huta",
] as const;

export const AREA_AROUND_KRAKOW = [
	"Zabierzów",
	"Balice",
	"Rząska",
	"Liszki",
	"Mników",
	"Piekary",
	"Czernichów",
	"Krzeszowice",
	"Alwernia",
	"Jerzmanowice",
	"Wielka Wieś",
	"Zielonki",
	"Michałowice",
	"Skawina",
	"Wieliczka",
	"Niepołomice",
	"Mogilany",
	"Świątniki Górne",
	"Trzebinia",
] as const;

export const AREA_AROUND_RYBNA = [
	"Rybna",
	"Czułówek",
	"Kamień",
	"Przeginia Narodowa",
	"Przeginia Duchowna",
	"Wołowice",
	"Rusocice",
	"Sanka",
] as const;

export const AREA_GROUPS = [
	{ label: "Kraków, dzielnice", places: AREA_KRAKOW_DISTRICTS },
	{ label: "Okolice Krakowa", places: AREA_AROUND_KRAKOW },
	{ label: "Okolice Rybnej", places: AREA_AROUND_RYBNA },
] as const;
