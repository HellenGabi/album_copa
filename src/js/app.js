var stickers = {};
var currentUser = null;
var currentTeam = 'all';
var currentFilter = 'all';
var searchQuery = '';
var authMode = 'login';
var currentReportType = 'complete';
var selectedStickers = new Set();

var grid;
var progressBar;
var progressPercent;
var statsTotal;
var statsRepeated;
var searchInput;
var filterBtns;

var authModal;
var authBtn;
var userProfile;
var userEmailSpan;
var logoutBtn;
var authForm;
var tabLogin;
var tabRegister;
var authError;
var closeModal;

var reportModal;
var closeReportModal;
var genPdfBtn;
var genTxtBtn;
var reportTemplate;

var multiSelectModal;
var closeMultiSelect;
var multiSelectBtn;
var multiSelectTeam;
var multiSelectGrid;
var multiSelectCount;
var selectAllBtn;
var deselectAllBtn;
var markAsHaveBtn;
var markAsRepeatedBtn;
var closeMultiSelectBtn;

function setupDOMElements() {
    grid = document.getElementById('sticker-grid');
    progressBar = document.getElementById('main-progress-bar');
    progressPercent = document.getElementById('progress-percent');
    statsTotal = document.getElementById('stats-total');
    statsRepeated = document.getElementById('stats-repeated');
    searchInput = document.getElementById('search-input');
    filterBtns = document.querySelectorAll('.btn-filter');

    authModal = document.getElementById('auth-modal');
    authBtn = document.getElementById('auth-btn');
    userProfile = document.getElementById('user-profile');
    userEmailSpan = document.getElementById('user-email');
    logoutBtn = document.getElementById('logout-btn');
    authForm = document.getElementById('auth-form');
    tabLogin = document.getElementById('tab-login');
    tabRegister = document.getElementById('tab-register');
    authError = document.getElementById('auth-error');
    closeModal = document.getElementById('close-modal');

    reportModal = document.getElementById('report-modal');
    closeReportModal = document.getElementById('close-report-modal');
    genPdfBtn = document.getElementById('gen-pdf-btn');
    genTxtBtn = document.getElementById('gen-txt-btn');
    reportTemplate = document.getElementById('report-template');

    multiSelectModal = document.getElementById('multi-select-modal');
    closeMultiSelect = document.getElementById('close-multi-select');
    multiSelectBtn = document.getElementById('multi-select-btn');
    multiSelectTeam = document.getElementById('multi-select-team');
    multiSelectGrid = document.getElementById('multi-select-grid');
    multiSelectCount = document.getElementById('multi-select-count');
    selectAllBtn = document.getElementById('select-all-btn');
    deselectAllBtn = document.getElementById('deselect-all-btn');
    markAsHaveBtn = document.getElementById('mark-as-have-btn');
    markAsRepeatedBtn = document.getElementById('mark-as-repeated-btn');
    closeMultiSelectBtn = document.getElementById('close-multi-select-btn');
}

function init() {
    console.log('init rodou');

    setupDOMElements();

    if (!grid) {
        console.error('Elemento #sticker-grid não encontrado');
        return;
    }

    if (typeof renderTeamFilter !== 'function') {
        console.error('renderTeamFilter não encontrado');
        return;
    }

    if (typeof loadDataLocal !== 'function') {
        console.error('loadDataLocal não encontrado');
        return;
    }

    renderTeamFilter();
    setupEventListeners();
    loadDataLocal();

    if (typeof setupAuthListeners === 'function') {
        setupAuthListeners();
    }
}