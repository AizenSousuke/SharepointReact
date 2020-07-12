import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
	PropertyPaneCheckbox,
	PropertyPaneDropdown,
	PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import styles from '../helloWorld/components/HelloWorld.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IHelloWorldWebPartProps {
	description: string;
	test: string;
	test1: boolean;
	test2: string;
	test3: boolean;
	image: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

	// React alternative
	// public render(): void {
	//   const element: React.ReactElement<IHelloWorldProps> = React.createElement(
	//     HelloWorld,
	//     {
	//       description: this.properties.description
	//     }
	//   );

	//   ReactDom.render(element, this.domElement);
	// }

	public render(): void {
		this.domElement.innerHTML = `
      <div class="${ styles.helloWorld}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle}">Customize SharePoint experiences using web parts.</p>
              <p class="${ styles.description}">${escape(this.properties.description)}</p>
              <p class="${ styles.description}">${escape(this.properties.test)}</p>
              <p class="${ styles.description}">${this.properties.test1}</p>
              <p class="${ styles.description}">${this.properties.test2}</p>
              <p class="${ styles.description}">${this.properties.test3}</p>
              <img class="${ styles.description}" src=${this.properties.image} />
              <p></p>
              
              <a href="https://aka.ms/spfx" class="${ styles.button}">
                <span class="${ styles.label}">Learn more</span>
              </a>
              
              <p className="${ styles.description}">Loading from ${this.context.pageContext.web.title}</p>
            </div>
          </div>
        </div>
      </div>`;
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
						image: strings.Image,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: 'Description'
								}),
								PropertyPaneTextField('test', {
									label: 'Multi-line Text Field',
									multiline: true,
								}),
								PropertyPaneCheckbox('test1', {
									text: 'Checkbox'
								}),
								PropertyPaneDropdown('test2', {
									label: 'Dropdown',
									options: [
										{ key: '1', text: 'One' },
										{ key: '2', text: 'Two' },
										{ key: '3', text: 'Three' },
										{ key: '4', text: 'Four' }
									]
								}),
								PropertyPaneToggle('test3', {
									label: 'Toggle',
									onText: 'On',
									offText: 'Off'
								}),
								PropertyPaneTextField('image', {
									label: 'Image',
									description: 'Put an image link',
									placeholder: 'http://loremflickr.com/100/100/image',
								})
							]
						}
					]
				}
			]
		};
	}
}
