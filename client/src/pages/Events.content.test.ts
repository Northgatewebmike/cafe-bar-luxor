import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const eventsSource = readFileSync(resolve(projectRoot, 'client/src/pages/Events.tsx'), 'utf8');
const translationsSource = readFileSync(resolve(projectRoot, 'client/src/contexts/LanguageContext.tsx'), 'utf8');
const appSource = readFileSync(resolve(projectRoot, 'client/src/App.tsx'), 'utf8');
const navigationSource = readFileSync(resolve(projectRoot, 'client/src/components/Navigation.tsx'), 'utf8');
const footerSource = readFileSync(resolve(projectRoot, 'client/src/components/Footer.tsx'), 'utf8');

describe('Events page', () => {
  it('registers the public route and links it from both navigation surfaces', () => {
    expect(appSource).toContain('import Events from "./pages/Events"');
    expect(appSource).toContain('path="/events" component={Events}');
    expect(navigationSource).toContain("{ href: '/events', label: t('nav.events') }");
    expect(footerSource).toContain("{ href: '/events', label: t('nav.events') }");
  });

  it('contains the poster and accurate event facts', () => {
    expect(eventsSource).toContain('/manus-storage/event-winterparty-2026_1e22c79a.png');
    expect(translationsSource).toContain("'events.date.value': 'Samstag, 05.12.2026'");
    expect(translationsSource).toContain("'events.date.value': 'Saturday, 05.12.2026'");
    expect(translationsSource).toContain("'events.time.value': 'Ab 18:00 Uhr'");
    expect(translationsSource).toContain("'events.time.value': 'From 18:00'");
    expect(translationsSource).toContain('Ohligser Markt 5, 42697 Solingen');
    expect(translationsSource).toContain('DJ Adrice');
    expect(translationsSource).toContain('Querbeats');
    expect(translationsSource).toContain('Indoors at Cafe&Bar Luxor');
  });

  it('keeps the supplied poster on managed storage rather than in the static bundle', () => {
    expect(eventsSource).toContain('/manus-storage/');
    expect(eventsSource).not.toContain('/media/event-winterparty-2026.png');
  });
});
