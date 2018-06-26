import tabsetTemplate from './tabset.template.html';
import tabTemplate from './tab.template.html';
import uiUtils from '../ui/uiUtils';

const TAB_ACTIVE_CLASS = 'air-tab__item--active';

let Tabset = document.querySelectorAll('Tabset');
let $tabTemplate = uiUtils.stringToHtml(tabTemplate);
let $tabsetTemplate = uiUtils.stringToHtml(tabsetTemplate);

function _getActiveTab($container){
  return $container.querySelector('.' + TAB_ACTIVE_CLASS);
}

function setActiveTab({
  $tabsetHeader,
  $tabsetContent
}, TABS, index, callback) {
  var currentTab = $tabsetHeader.querySelector('.' + TAB_ACTIVE_CLASS);
  if (currentTab && currentTab.classList) {
    currentTab.classList.remove(TAB_ACTIVE_CLASS);
  }
  var tab = $tabsetHeader.querySelectorAll('.air-tab__item')[index];
  if (!tab) {
    throw 'tab com index (' + index + ') não existe';
  }
  tab.classList.add(TAB_ACTIVE_CLASS);
  $tabsetContent.innerHTML = '';
  $tabsetContent.appendChild(TABS[index]);
  var tabName = tab.innerText.toUpperCase();
  callback && callback(tabName, $tabsetContent);
}

function render(callback) {
  Tabset.forEach(tabset => {
    let $tabset = document.importNode($tabsetTemplate, true);
    let $tabsetHeader = $tabset.querySelector('.air-tab');
    let $tabsetContent = $tabset.querySelector('.air-tab__content');
    var TABS = [];
    let $tabList = tabset.querySelectorAll('Tab');
    let i = 0;
    $tabList.forEach(tabInfo => {
      var tab = document.importNode($tabTemplate, true);
      tab.innerText = tabInfo.title;
      tab.index = i;
      tab.onclick = () => {
        setActiveTab({
          $tabsetHeader,
          $tabsetContent
        }, TABS, tab.index, callback);
      };
      $tabsetHeader.appendChild(tab);
      let span = document.createElement("span");
      span.innerHTML = tabInfo.innerHTML;
      TABS.push(span);
      i++;
    });
    tabset.innerHTML = '';
    tabset.appendChild($tabset);
    setActiveTab({
      $tabsetHeader,
      $tabsetContent
    }, TABS, 0, callback);
  });
}

export default {
  render,
  getActiveTab: _getActiveTab
};
