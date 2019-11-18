/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
	insertRowBlock,
} from '../row/row-helper';
import {
	selectColumnBlock,
} from './column-helper';
import {
	openSidebarPanelWithTitle,
	selectOption,
} from '../helper';

describe( 'column block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.column.bgColorOptions should add background color', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();
		await selectColumnBlock();
		await openSidebarPanelWithTitle( 'Background color' );

		// Additional background color should be available
		expect( await page.$( '.components-color-palette__item[aria-label="Color: brand"]' ) ).not.toBeNull();

		// Background color should be applied
		await page.click( '.components-color-palette__item[aria-label="Color: brand"]' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wpBootstrapBlocks.column.paddingOptions should add padding option', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();
		await selectColumnBlock();
		await openSidebarPanelWithTitle( 'Padding (inside column)' );

		// Additional padding option should be available
		expect( await page.$( 'select.components-select-control__input > option[value="p-8"]' ) ).not.toBeNull();

		// Padding option should be applied
		await selectOption( 'Size', 'p-8' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
