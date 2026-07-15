# Handoff: Widget „Zaprojektuj pieczątkę”

## Overview
Interaktywny konfigurator pieczątki — użytkownik buduje treść pieczątki linia po linii (1–8 linii), z kontrolą czcionki/rozmiaru/stylu na każdą linię, widzi podgląd na żywo, a na końcu wysyła projekt do właściciela serwisu przez modal z formularzem kontaktowym (e-mail + telefon, zwalidowane). Musi działać jako **osadzalny widget** — to samo źródło komponentu montowane w dwóch miejscach:
- `http://localhost:3000/uslugi/mobilne-wyrob-pieczatek` (osadzony w istniejącej stronie usługi, np. jako sekcja na dole)
- `http://localhost:3000/produkty/pieczatki` (jako samodzielna podstrona „Zaprojektuj pieczątkę”)

## Kontekst repo
Frontend: `NextShopClient` (Next.js App Router + TypeScript + Tailwind). Backend: `NextShopBackend` (Django + DRF). Sprawdź przed startem:
- Czy istnieje już endpoint wysyłki formularza kontaktowego (np. `web/cms` albo `web/contact`) — użyj go jako wzorca/bazy zamiast pisać nowy mechanizm mailowy od zera.
- Istniejące komponenty formularzy w `src/components/` (inputy, walidacja — prawdopodobnie Zod/React Hook Form lub natywne) — trzymaj się tej samej biblioteki/wzorca.
- Istniejący `Modal`/`Dialog` komponent w repo, jeśli jest — reużyj zamiast tworzyć nowy.

## Krok po kroku

### 1. Komponent widgetu (frontend)
Stwórz `src/components/widgets/StampDesigner/` jako samodzielny, reużywalny komponent (client component, `"use client"`):
- `StampDesigner.tsx` — główny komponent, przyjmuje opcjonalne propsy: `variant?: "embedded" | "page"`, `onSubmit?: (payload) => void` (domyślnie woła API).
- Stan: tablica `lines: { id, text, font, size, bold, italic }[]`, max 8 linii, min 1.
- Kontrolki na linię: pole tekstowe (limit ok. 60 znaków), przełącznik **B** (pogrubienie) i **I** (kursywa), select czcionki (4 opcje — patrz „Design tokens”), select/suwak rozmiaru (7–14, w punktach lub jako umowna skala podglądu), przycisk usuń linię.
- Przycisk „Dodaj linię” — disabled przy 8 liniach, z komunikatem „Maksymalnie 8 linii”.
- Panel podglądu: prostokąt/owal imitujący odcisk pieczątki, renderuje każdą linię z jej stylem (font/size/bold/italic), wyśrodkowane, ciemny kolor na jasnym tle (jak realny odcisk tuszu).
- Przycisk „Wyślij projekt do wyceny” — otwiera modal.

### 2. Modal wysyłki
- Pola: e-mail (walidacja formatu), telefon (walidacja polskiego formatu, np. 9 cyfr / +48), opcjonalna uwaga (textarea).
- Walidacja inline, blokada przycisku „Wyślij” dopóki pola niepoprawne, komunikaty błędów pod polami.
- Po wysyłce: payload = dane kontaktowe + pełna struktura `lines` (treść + style każdej linii) + strona źródłowa (`embedded`/`page`) → POST do tego samego mechanizmu, który obsługuje formularz w zakładce „Kontakt” (sprawdź `src/app/kontakt/` i backend endpoint, którego używa — podepnij się pod niego, nie duplikuj logiki mailowej).
- Stan sukcesu: komunikat potwierdzający w modalu („Dziękujemy, odezwiemy się w ciągu 24h”) + zamknięcie po kliknięciu.

### 3. Backend
- Jeśli istnieje już endpoint kontaktowy wysyłający e-mail do właściciela — rozszerz go o opcjonalne pole `stamp_design` (JSON z liniami) i inny szablon e-maila (dołącz treść linii + style w czytelnej formie tekstowej, żeby właściciel widział dokładnie co ma wygrawerować).
- Jeśli nie istnieje: dodaj widok DRF `POST /api/contact/stamp-design/` w `web/cms` (lub analogicznej apce), z walidacją serializer (email, telefon, lista linii z ograniczeniem 1–8 elementów), wysyłką e-maila (Django `send_mail`/istniejący mechanizm) do adresu właściciela.

### 4. Osadzenie w dwóch miejscach
- `src/app/uslugi/mobilne-wyrob-pieczatek/page.tsx` — dodaj sekcję na dole strony: `<StampDesigner variant="embedded" />` wewnątrz kontenera o max-width zgodnym z resztą strony.
- `src/app/produkty/pieczatki/page.tsx` — jeśli strona nie istnieje, utwórz ją jako podstronę produktową z H1 „Zaprojektuj pieczątkę”, krótkim wstępem SEO i `<StampDesigner variant="page" />` jako główną treść. Dodaj metadata (`meta_title`, `meta_description`) i wpis w `sitemap.ts`.
- Upewnij się, że komponent nie zależy od kontekstu strony (czysty, przenośny), żeby dało się go w przyszłości osadzić gdzie indziej.

## Design tokens
- Czcionki do wyboru (4 podstawowe, kontrastowe style): Montserrat (sans, nowoczesna), Playfair Display (szeryfowa, elegancka), Courier Prime (maszynowa/urzędowa), EB Garamond (klasyczna szeryfowa). Google Fonts, wagi 400/600/700.
- Rozmiary: skala 7–14 (punkty typograficzne pieczątki), w podglądzie mapuj proporcjonalnie np. na 12–26px, żeby różnica była czytelna na ekranie.
- Kolory: tło strony `#ffffff`, panel edytora `#f3f4f6`, karty linii `#ffffff` z obwódką `#e5e7eb`, tekst główny `#1f2937`, pomocniczy `#6b7280`/`#4b5563`, akcent/przycisk główny `#1f2937` (hover `#111827`), błędy walidacji `#dc2626`.
- Podgląd odcisku: tło `#f3f4f6` lub biały prostokąt z cieniem, tekst w kolorze `#1e3a5f` lub `#1f2937` (symulacja tuszu), obramowanie przypominające ramkę pieczątki (`border: 2px solid`, zaokrąglone rogi lub owal w zależności od wybranego kształtu — jeśli chcesz też wybór kształtu pieczątki, dodaj to jako kolejny select: prostokątna / okrągła / owalna).
- Przyciski: `border-radius: 6-8px`, spójne z resztą serwisu (patrz poprzedni handoff „Mobilne usługi”).

## UX szczegóły do zachowania
- Domyślnie widget startuje z 1 pustą linią.
- Dodawanie/usuwanie linii nie gubi stylów pozostałych linii (stan trzymany po `id`, nie po indeksie).
- Limit 8 linii ma czytelny komunikat, nie tylko wyszarzony przycisk.
- Numer telefonu i e-mail walidowane przed wysyłką — błąd = brak wysyłki + czerwony komunikat pod polem.
- Responsywność: na mobile edytor i podgląd w jednej kolumnie (podgląd pod edytorem), kontrolki per-linia zawijają się.

## Do potwierdzenia z klientem
- Docelowy adres e-mail odbiorcy zgłoszeń projektu pieczątki (ten sam co formularz kontaktowy, czy inny?).
- Czy potrzebny wybór kształtu pieczątki (prostokąt/okrąg/owal) w tej wersji, czy zostawiamy na później.
- Czy podgląd ma umożliwiać pobranie/wydruk projektu (PDF/PNG) przed wysyłką, czy wystarczy wysyłka na e-mail.
