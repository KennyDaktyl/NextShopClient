# Handoff: Widget „Sprawdź, czy dorobimy Twój klucz” (zdjęcie + zapytanie)

## Overview
Widget pozwalający klientowi wysłać zdjęcie klucza (zrobione telefonem na żywo lub dodane jako plik z komputera) razem z danymi kontaktowymi — właściciel serwisu ogląda zdjęcie i ocenia, czy ma odpowiednią ostrugę/rowek do dorobienia takiego klucza, zanim klient przyjedzie lub zamówi dojazd. Ma dawać jasną instrukcję ułożenia klucza (poziomo, główką w prawo, cały w kadrze), żeby zdjęcia nadawały się do oceny.

## Kontekst repo
Frontend: `NextShopClient` (Next.js App Router). Backend: `NextShopBackend` (Django + DRF). Ten widget to trzeci tego typu komponent po `StampDesigner` (projektant pieczątki) i formularzu kontaktowym — **reużyj ten sam mechanizm wysyłki e-mail / storage plików**, który już powstał lub istniał wcześniej, nie twórz nowego od zera.

## Krok po kroku

### 1. Komponent frontend
Stwórz `src/components/widgets/KeyPhotoInquiry/KeyPhotoInquiry.tsx` (client component, `"use client"`), reużywalny (osadzalny na dowolnej stronie, np. na `uslugi/mobilne-dorabianie-kluczy`):
- **Strefa dodania zdjęcia** z dwoma przyciskami:
  - „Zrób zdjęcie telefonem” — `<input type="file" accept="image/*" capture="environment">` (na mobile otwiera aparat bezpośrednio).
  - „Dodaj plik z komputera” — `<input type="file" accept="image/*">` bez atrybutu `capture` (na desktopie otwiera zwykły file picker).
- **Podpowiedź ułożenia klucza** nad strefą uploadu: mała ilustracja/ikona + tekst instrukcji: klucz poziomo, główka skierowana w prawo, cały klucz w kadrze, dobre oświetlenie. (Ilustracja w pliku referencyjnym to prosty SVG — można zostawić jako uproszczoną grafikę lub użyć prawdziwego zdjęcia demonstracyjnego, jeśli klient je dostarczy).
- Po wybraniu pliku: pokaż podgląd zdjęcia (miniaturkę) z przyciskiem „usuń / zmień zdjęcie”.
- **Walidacja pliku**: tylko obrazy (`image/*`), limit rozmiaru np. 10 MB, komunikat błędu jeśli przekroczony lub zły typ.
- **Pola kontaktowe**: e-mail (walidacja formatu) i telefon (walidacja polskiego numeru), plus opcjonalna notatka tekstowa („napis na kluczu, marka zamka” itp.).
- Przycisk „Wyślij zapytanie i zdjęcie” — disabled dopóki: brak zdjęcia LUB e-mail niepoprawny LUB telefon niepoprawny. Stan sukcesu po wysyłce: komunikat potwierdzający.

### 2. Backend
- Endpoint `POST /api/inquiries/key-photo/` (Django DRF, w apce najbliższej istniejącym formularzom kontaktowym) przyjmujący `multipart/form-data`: plik zdjęcia + email + telefon + notatka.
- Walidacja: typ i rozmiar pliku po stronie serwera też (nie tylko frontend), poprawność e-maila/telefonu.
- Zapisz zdjęcie w istniejącym storage (media/S3 — sprawdź konwencję repo dla uploadów produktowych) i wyślij e-mail do właściciela z: miniaturą/linkiem do zdjęcia, danymi kontaktowymi, notatką. Użyj tego samego mechanizmu wysyłki e-mail co formularz kontaktowy / projektant pieczątki.
- Ewentualnie zapisz zgłoszenie w prostym modelu (np. `KeyPhotoInquiry`) widocznym w Django admin, żeby właściciel miał listę zgłoszeń nawet jeśli przegapi e-mail.

### 3. Osadzenie
- Dodaj widget jako sekcję na dole strony `src/app/uslugi/mobilne-dorabianie-kluczy/page.tsx` (pod sekcją kontaktową lub zamiast niej — do decyzji, ale logicznie pasuje jako krok przed telefonem: „nie wiesz czy mamy Twój klucz? wyślij zdjęcie”).
- Zbuduj go jako niezależny komponent, żeby dało się go łatwo osadzić też np. na stronie produktowej kluczy w przyszłości.

## Design tokens
Zgodne z resztą serwisu i poprzednimi widgetami: tło `#ffffff`, panel/strefa uploadu `#fafafa` z obwódką przerywaną `#d1d5db` (dashed), przycisk główny `#1f2937` (hover `#111827`), przycisk drugorzędny biały z obwódką `#d1d5db` (hover obwódka/tekst `#2563eb`), błędy `#dc2626`, komunikat sukcesu tło `#ecfdf5` obwódka `#a7f3d0` tekst `#065f46`. Radius kart/przycisków `8-12px`. Font Montserrat.

## UX szczegóły do zachowania
- Przycisk „Zrób zdjęcie” i „Dodaj plik” to DWA oddzielne inputy z różnym atrybutem `capture`, nie jeden — to jedyny sposób, by na telefonie jeden od razu otwierał aparat, a drugi galerię/pliki.
- Instrukcja ułożenia klucza (poziomo, główka w prawo) musi być widoczna PRZED dodaniem zdjęcia, nie tylko w treningu użytkownika — stały element nad strefą uploadu.
- Podgląd dodanego zdjęcia z opcją usunięcia/zmiany, żeby klient mógł poprawić kadr bez przeładowania strony.
- Wysyłka zablokowana dopóki brak zdjęcia i poprawnych danych kontaktowych — komunikaty walidacji pod polami, nie tylko wyszarzony przycisk.

## Do potwierdzenia z klientem
- Docelowy adres e-mail odbiorcy zgłoszeń (ten sam co formularz kontaktowy/projektant pieczątki?).
- Czy potrzebny automatyczny e-mail potwierdzający do klienta („otrzymaliśmy zgłoszenie”), czy tylko komunikat na stronie.
- Czy chcesz też prosty panel/listę zgłoszeń w Django adminie do przeglądania nadesłanych zdjęć kluczy.
