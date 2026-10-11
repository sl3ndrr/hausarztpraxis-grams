/**
 * Sticky Header mit Klick-Untermenü und mobilem Menü-Panel.
 * Eingaben: practice/navigation/UI; Außenklick wird ausschließlich in main verbunden.
 * Menüpunkte in content/navigation.js ändern, Layout in styles/layout.css.
 */
import { liveStatus } from './live-status.js';
import { practice } from '../../content/practice.js';
import { navigation } from '../../content/navigation.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { icon } from './icons.js';
import { themeSwitch } from './theme-switch.js';
import { fontSizeSwitch } from './font-size-switch.js';
export function header() {
  const controller = new AbortController();
  const status = liveStatus({ compact: true });
  const submenus = [];
  const nav = h('nav', { 'aria-label': practice.name, className: 'header__nav' }, navigation.map(item => {
    const link = h('a', { href: item.href, 'data-nav-link': '' }, item.text);
    if (!item.children) return link;
    const menu = h('div', { id: 'services-menu', className: 'header__submenu', hidden: true }, item.children.map(child => h('a', { href: child.href, className: `accent--${child.accent}`, 'data-nav-link': '' }, child.text)));
    const toggle = h('button', { type: 'button', 'aria-label': item.text, 'aria-expanded': 'false', 'aria-controls': 'services-menu', 'data-submenu-toggle': '' }, icon('chevron'));
    const group = h('div', { className: 'header__nav-group' }, link, toggle, menu);
    const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); });
    submenus.push({ group, toggle, close });
    return group;
  }));
  const settingsPanel = h('div', { id: 'settings-panel', className: 'header__settings', hidden: true }, h('p', { className: 'eyebrow' }, ui.font), fontSizeSwitch(), themeSwitch('header'));
  const settingsButton = h('button', { type: 'button', className: 'button button--quiet header__settings-toggle', 'aria-expanded': 'false', 'aria-controls': 'settings-panel', 'aria-label': ui.settings }, h('span', { className: 'header__settings-label' }, ui.settings), h('span', { className: 'header__settings-short', 'aria-hidden': 'true' }, ui.settingsShort));
  const closeSettings = () => { settingsPanel.hidden = true; settingsButton.setAttribute('aria-expanded', 'false'); };
  settingsButton.addEventListener('click', () => { const open = settingsPanel.hidden; settingsPanel.hidden = !open; settingsButton.setAttribute('aria-expanded', String(open)); });
  const panel = h('div', { id: 'navigation-panel', className: 'header__panel' }, nav);
  const menuButton = h('button', { type: 'button', className: 'button button--quiet header__menu', 'aria-expanded': 'false', 'aria-controls': 'navigation-panel', 'data-menu-toggle': '' }, ui.menu);
  const root = h('header', { className: 'header' }, h('div', { className: 'container header__inner' },
    h('div', { className: 'header__top' }, h('a', { href: '#/', className: 'brand' }, h('span', { className: 'brand__mark', 'aria-hidden': 'true' }, '+'), h('span', {}, practice.name, h('small', {}, practice.doctor))),
      h('a', { href: practice.phone.href, className: 'button header__phone', 'aria-label': `${ui.call}: ${practice.phone.text}` }, icon('phone'), h('span', { className: 'header__phone-text' }, practice.phone.text)), settingsButton, menuButton), panel, h('div', { className: 'header__status' }, status.element), settingsPanel));
  const media = matchMedia('(min-width: 1100px)');
  const closeMenu = () => { closeSettings(); menuButton.setAttribute('aria-expanded', 'false'); panel.hidden = !media.matches; submenus.forEach(item => item.close()); };
  closeMenu();
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; panel.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); });
  root.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const dismissOutside = event => { submenus.forEach(item => { if (!item.group.contains(event.target)) item.close(); }); if (!root.contains(event.target)) closeMenu(); };
  root.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!settingsPanel.hidden) { closeSettings(); settingsButton.focus(); return; } const expanded = submenus.find(item => item.toggle.getAttribute('aria-expanded') === 'true'); if (expanded) { expanded.close(); expanded.toggle.focus(); } else if (!media.matches && !panel.hidden) { closeMenu(); menuButton.focus(); } } });
  media.addEventListener('change', closeMenu, { signal: controller.signal });
  return { element: root, closeMenu, dismissOutside, destroy: () => { controller.abort(); status.destroy(); } };
}

