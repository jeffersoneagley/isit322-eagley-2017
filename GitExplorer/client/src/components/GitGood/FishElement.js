/**
 * Created by fish on 5/28/17.
 */
import React, {Component} from 'react';
// import '../../css/forms.css';
import Debug from '../Debug/Debug';
import ElfElement from '../Elf/ElfElement';
const logger = new Debug(false);

class FishElement extends Component {
    constructor(props) {
        logger.log('FORM INPUT', 'constructor called', props);
        super(props);
        logger.log('FORM PROPS', this.props);
    }

    render() {
        switch (this.props.type) {
            case 'image': {
                console.log('image type');
                return <div
                >
                    <img src={this.props.value}
                         id={this.props.id}
                         alt={this.props.label}/>
                </div>;

            }

            case 'url': {
                return <a href={this.props.value} className='btn btn-info btn-block ellipses'
                          role='button'
                          target='_new'>
                    {this.props.value || 'no url given'}
                </a>;

            }

            case 'bool': {
                return <ElfElement
                    {...this.props}
                    type='paragraph'
                    value={this.props.value === 'true' || this.props.value === true ?
                        'Yes' : 'No'}
                />;
            }

            default:
                return <ElfElement {...this.props} />;
        }
    }
}

export default FishElement;
