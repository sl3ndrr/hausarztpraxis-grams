/**
 * Sticky Header mit Klick-Untermenü und mobilem Menü-Panel.
 * Eingaben: practice/navigation/UI; globale Listener über einen AbortController.
 * Menüpunkte in content/navigation.js ändern, Layout in styles/layout.css.
 */
import { practice } from '../../content/practice.js';
import { navigation } from '../../content/navigation.js';
import { ui } from '../../content/site.js';
import { h } from '../lib/dom.js';
import { icon } from './icons.js';
import { themeSwitch } from './theme-switch.js';
import { fontSizeSwitch } from './font-size-switch.js';
export function header() {
  const controller = new AbortController();
  const submenus = [];
  const nav = h('nav', { 'aria-label': practice.name, className: 'header__nav' }, navigation.map(item => {
    const link = h('a', { href: item.href, 'data-nav-link': '' }, item.text);
    if (!item.children) return link;
    const menu = h('div', { id: 'services-menu', className: 'header__submenu', hidden: true }, item.children.map(child => h('a', { href: child.href, 'data-nav-link': '' }, child.text)));
    const toggle = h('button', { type: 'button', 'aria-label': item.text, 'aria-expanded': 'false', 'aria-controls': 'services-menu', 'data-submenu-toggle': '' }, icon('chevron'));
    const group = h('div', { className: 'header__nav-group' }, link, toggle, menu);
    const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); });
    submenus.push({ group, toggle, close });
    return group;
  }));
  const panel = h('div', { id: 'navigation-panel', className: 'header__panel' },
    h('div', { className: 'header__settings' }, fontSizeSwitch(), themeSwitch('header')), nav);
  const menuButton = h('button', { type: 'button', className: 'button button--quiet header__menu', 'aria-expanded': 'false', 'aria-controls': 'navigation-panel', 'data-menu-toggle': '' }, ui.menu);
  const root = h('header', { className: 'header' }, h('div', { className: 'container header__inner' },
    h('div', { className: 'header__top' }, h('a', { href: '#/', className: 'brand' }, h('span', { className: 'brand__mark', 'aria-hidden': 'true' }, '+'), h('span', {}, practice.name, h('small', {}, practice.doctor))),
      h('a', { href: practice.phone.href, className: 'button header__phone' }, icon('phone'), practice.phone.text), menuButton), panel));
  const media = matchMedia('(min-width: 900px)');
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); panel.hidden = !media.matches; submenus.forEach(item => item.close()); };
  closeMenu();
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; panel.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); });
  root.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { submenus.forEach(item => { if (!item.group.contains(event.target)) item.close(); }); if (!root.contains(event.target)) closeMenu(); }, { signal: controller.signal });
  root.addEventListener('keydown', event => { if (event.key === 'Escape') { const expanded = submenus.find(item => item.toggle.getAttribute('aria-expanded') === 'true'); if (expanded) { expanded.close(); expanded.toggle.focus(); } else { closeMenu(); menuButton.focus(); } } });
  media.addEventListener('change', closeMenu, { signal: controller.signal });
  return { element: root, closeMenu, destroy: () => controller.abort() };
}
