import {GridFacetSpec} from './facets/grid-facet.widget';
import {Moment} from 'moment';

export const GRID_DATE_PICKER_CONFIG = {
    dateInputFormat: 'MM/DD/YYYY',
    showWeekNumbers: false,
    containerClass: 'theme-default'
};

export const GRID_DEBUG_NONE = 0;
export const GRID_DEBUG_LOW = 1;
export const GRID_DEBUG_HIGH = 2;

export type GridSearchModes = 'immediate' | 'return';

export type GridConstraintOperators = '=' | '<>' | '>' | '<' | '>=' | '<=' | 'IN' | 'LIKE';

export type GridItemEventTypes = 'remove' | 'unremove' | 'select' | 'unselect' | 'append' | 'splice' | 'modified' | 'save' | 'save-cancel';

export type GridListEventTypes = 'reorder' | 'reload' | 'loaded';

export type GridTextTypes = 'input' | 'textarea' | 'wysiwyg' | 'number';

export type GridColTypes = 'text' | 'link' | 'date' | 'image' | 'list' | 'avatar' | 'icon' |
    'email' | 'check' | 'lookup' | 'time-ago' | 'custom' | 'gauge';

export type GridModes = 'rows' | 'tiles';
export type GridLinkTypes = 'local' | 'external' | 'click' | 'callback';
export type GridPositions = 'left' | 'top' | 'bottom' | 'right';
export type GridOrientations = 'horizontal' | 'vertical';
export type GridWidgets = 'mode' | 'paginator' | 'sizes' | 'info' | 'facets' | 'search' | 'blank' | 'custom';

export const GRID_OPSPEC_DEFAULT: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}, {name: 'paginator'}]},
    {position: 'bottom', widgets: [{name: 'mode'}, {name: 'sizes'}, {name: 'info'}]}
];
export const GRID_OPSPEC_ROW_SIMPLE_BOTTOM: Array<GridOpsSpec> = [
    {position: 'bottom', widgets: [{name: 'paginator'}, {name: 'sizes'}, {name: 'info'}]}
];
export const GRID_OPSPEC_WITH_FACETS: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}, {name: 'paginator'}, {name: 'mode'}, {name: 'sizes'}, {name: 'info'}]},
    {position: 'left', widgets: [{name: 'facets'}]}
];
export const GRID_OPSPEC_SPLIT_WITH_FACETS: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}, {name: 'paginator'}]},
    {position: 'bottom', widgets: [{name: 'sizes'}, {name: 'info'}]},
    {position: 'left', widgets: [{name: 'mode'}, {name: 'facets'}]}
];
export const GRID_OPSPEC_SEARCH_ONLY: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}]}];
export const GRID_OPSPEC_SEARCH_AND_PAGING_TOP: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}, {name: 'paginator'}]}];
export const GRID_OPSPEC_SEARCH_TOP_PAGING_BOTTOM: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}]},
    {position: 'bottom', widgets: [{name: 'paginator'}]}
];
export const GRID_OPSPEC_SEARCH_INFO_TOP_PAGING_BOTTOM: Array<GridOpsSpec> = [
    {position: 'top', widgets: [{name: 'search'}, {name: 'info'}]},
    {position: 'bottom', widgets: [{name: 'paginator'}]}
];

export type GridClickTypes = ((item: GridItem) => void) | boolean | string | GridLinkSpec;

export interface GridOpsLocations {
    left: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
}

export interface GridOpCustomSpec {
    html: string;
    onClick: (items: Array<GridItem>) => void;
}

export interface GridOpWidgetSpec {
    name: GridWidgets;
    classes?: string;
    customSpec?: GridOpCustomSpec;
}

export interface GridOpsSpec {
    position: GridPositions;
    widgets: Array<GridOpWidgetSpec>;
}

export interface GridButtonSpec {
    // Minimum configuration must include action or url, plus text or icon.
    action?: ((item: GridItem) => void) | 'remove' | 'unremove';
    url?: string;
    text?: string;
    icon?: string;

    // Optional.
    confirmation?: string | boolean;
    hover?: string;
    classes?: string;
    visibleCheck?: ((item: GridItem) => boolean) | true;
}

export interface GridActionsSpec {
    // Minimum configuration.
    buttons: Array<GridButtonSpec>;

    // Optional.
    minWidth?: string;
    position?: GridPositions;
    orientation?: GridOrientations;
    inlineEditSpec?: GridInlineEditSpec;

    // Internal use.
    __visible?: boolean;
}

export interface GridLinkSpec {
    // Minimum configuration.
    path?: string;
    click?: (item: GridItem) => void;

    // Optional.
    linkType?: GridLinkTypes;
    target?: string;
    text?: string;
}

export interface GridColBaseSpec {
    classes?: string;
    linkSpec?: GridLinkSpec;
}

export interface GridColTextSpec extends GridColBaseSpec {
    textType?: string;
    format?: string;
    highlight?: boolean;
}

export interface GridColGaugeSpec extends GridColBaseSpec {
    color: string;
    label?: string;
    showLabel?: boolean | undefined;
}

export interface GridCustomInput {
    name: string;
    value: any;
}

export interface GridColCustomSpec extends GridColBaseSpec {
    componentName: string; // must set GridService customComponents array prior to using this
    componentInputs?: Array<GridCustomInput>;
    highlight?: boolean;
}

export interface GridColCheckSpec extends GridColBaseSpec {
    checkedClasses?: string;
    uncheckedClasses?: string;
}

export interface GridColIconSpec extends GridColBaseSpec {
    icon?: string;
}

export interface GridColEmailSpec extends GridColBaseSpec {
    showText?: boolean;
}

export interface GridColAvatarSpec extends GridColBaseSpec {
    imageCol: string;
    firstNameCol?: string;
    lastNameCol?: string;
}

export interface GridColLookupSpec extends GridColBaseSpec {
    valueColName?: string;
    displayColName?: string;
    items: Array<any>;
}

export interface GridColLinkSpec extends GridColBaseSpec {
    tbd?: string;
}

export interface GridColListSpec extends GridColBaseSpec {
    listColName: string;
    listColPathSuffix?: string; // used if list items are links
}

export interface GridColImageSpec extends GridColBaseSpec {
    classes?: string;
    src?: string;
    srcCallback?: (item: GridItem) => string;
    alt?: string;
}

export interface GridColDateSpec extends GridColBaseSpec {
    format?: string;
}

export type GridTypeSpecs = GridColTextSpec |
    GridColCustomSpec |
    GridColGaugeSpec |
    GridColEmailSpec |
    GridColImageSpec |
    GridColDateSpec |
    GridColListSpec |
    GridColAvatarSpec |
    GridColLookupSpec |
    GridColIconSpec;

export interface GridColFilter {
    name: string;
    query: string;
}

export interface GridItemEvent {
    listId: string;
    item: GridItem;
    eventType: GridItemEventTypes;
}

export interface GridListEvent {
    listId: string;
    query: string | null | undefined;
    items: Array<GridItem>;
    eventType: GridListEventTypes;
    retrievalResult?: any;
}

export interface GridPostFacet {
    name: string;
    values: Array<string | number>;
}

export interface GridPost {
    offset: number;
    size: number;
    sort: string | null;
    query: string | null;
    filters: Array<GridColFilter>;
    facets: Array<GridPostFacet>;
    excludeIds?: Array<number | string>;
    hardConstraints?: Array<GridConstraint>;
}

export interface GridTileSpec {
    // Optional.
    bodyColSpecs?: Array<GridColSpec>;
    fallbackImage?: string;
    footer?: string;
    imageAlt?: string;
    imageCallback?: (item: GridItem) => string | null;
    imageColumn?: string;
    titleCallback?: (item: GridItem) => string | null;
    titleColumn?: string;
}

export interface GridRowCheckSpec {
    hasCheckAll: boolean;
    position: GridPositions;
    colName: string;
    checkAllHeading?: string;
    checkedCb?: (items: Array<GridItem>) => void;
}

export interface GridTableSpec {
    hideHeader?: boolean;
    tableClass?: string;
    rowClassCb?: (item: GridItem) => string;
    checkSpec?: GridRowCheckSpec;
}

export interface GridConstraint {
    colName: string;
    operator: GridConstraintOperators;
    value: any;
}

export interface GridColSpec {
    // Minimum configuration.
    name: string;

    // Optional.
    bodyCellClasses?: string;
    displayConditionCb?: (item: GridItem) => boolean;
    editable?: boolean;
    exportable?: boolean;
    filter?: string;
    headerCellClasses?: string;
    heading?: string;
    render?: (item: GridItem) => string;
    required?: boolean;
    searchWidth?: number;
    showMaxWidth?: number;
    showMinWidth?: number;
    sortable?: boolean | string;
    type?: GridColTypes;
    typeSpec?: GridTypeSpecs;

    // Internal use.
    __colIndex?: number;
    __sortColName?: string;
}

export interface GridPageState {
    // Minimum configuration.
    pageNum: number;
    size: number;
    rowSize: number;
    tileSize: number;
    count: number;
    total: number;
    mode: GridModes;

    // Optional.
    className?: string;
    pageStops?: Array<number>;
    numPages?: number;
    sizes?: Array<number>;

    // Internal use.
    __maxVisibleStops?: number;
    __pageStopShows?: Array<boolean>;
}

export interface GridBlankSpec {
    // Minimum configuration.
    colSpecs: Array<GridColSpec>;
    position: GridPositions;

    // Optional.
    disallowDuplicates?: boolean;
    headingText?: string;
    helpText?: string;
    buttonText?: string;
}

// A listing item that wraps around the basic data record.
//
export interface GridItem {
    record: any; // actual data record

    // Internal use.
    __deleted: boolean;          // true if the record is marked as deleted, according to the status flag column and/or through deletion
    __selected: boolean;         // true if the record has been selected
    __expanded: boolean;         // true if the record has been expanded (future use)
    __colValues: Array<string | number>;  // the interpolated values of the column, ready for display, established when records are retrieved/created
    __editValues: Array<string | number>; // inline editing values, which may differ from __colValues when editing
    __index: number;             // the order of the item within the __items list
}

export interface GridInlineEditSpec {
    tbd?: any;
}

// The configuration specification for the entire grid widget.
//
export interface GridConfig {
    // Minimum configuration. Must specify either a dataRetrieval callback or a dataService/url combination.
    uniqueId: string;
    pageState: GridPageState;
    colSpecs: Array<GridColSpec>;
    dataRetrieval?: () => Array<any>;
    dataUrl?: string;

    // Optional.
    actionsSpec?: GridActionsSpec;
    afterLoad?: (records: Array<any>) => Array<any>;
    beforeLoad?: (config: GridConfig) => void;
    blankSpec?: GridBlankSpec;
    classes?: string;
    containerWidth?: number;
    currentFilters?: Array<GridColFilter>;
    currentSort?: GridColSpec;
    currentSortAscending?: boolean;
    dragDropEnabled?: boolean;
    excludeIds?: Array<number | string>;
    facetSpecs?: Array<GridFacetSpec>;
    hardConstraints?: Array<GridConstraint>;
    itemClick?: GridClickTypes;
    messageNoRecords?: string | false;
    noRecordsHideBody?: boolean;
    modeOptional?: boolean;
    opSpecs?: Array<GridOpsSpec>;
    query?: string;
    selectMultiple?: boolean;
    searchMode?: GridSearchModes;
    searchPlaceholder?: string;
    sortColName?: string;
    statusActive?: string;
    statusDeleted?: string;
    statusField?: string;
    suppressInitialLoad?: boolean;
    tableSpec?: GridTableSpec;
    tileSpec?: GridTileSpec;

    // Internal use.
    __debug?: number;
    __initialized?: boolean;
    __inlineEditingIndex?: number | false | 'all';
    __items?: Array<GridItem>;
    __lastPostData?: GridPost | null;
    __lastRetrieved?: Moment | null;
    __loading?: boolean;
    __pendingPost?: GridPost | null;
    __quadrants?: GridOpsLocations;
}
