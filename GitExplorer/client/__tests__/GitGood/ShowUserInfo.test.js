import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import fieldDefMocks from '../../__mocks__/mock-field-definitions';
import ShowUserInfo from '../../src/components/GitGood/ShowUserInfo';

describe('Test suite for GetUserInfo functionality', function() {
        let fieldDefinitions = [];
        let gitUser = {};

        function gitUserInit() {
            const tempGitUser = {};
            for (let value in fieldDefMocks) {
                let field = fieldDefMocks[value];
                tempGitUser[field.id] = field.sample;
            }
            return tempGitUser;
        };

        beforeEach(function() {
            fieldDefinitions = fieldDefMocks;
            gitUser = gitUserInit();
        });

        // let simNames = JSON.parse(mockData('/api/user').body);

        it('renders component without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<ShowUserInfo />, div);
        });

        function runTestCycleOnValue(id, value) {
            it('Renders ' + id + ' paragraph containing ' + value.sample, () => {
                // console.log(fieldDefinitions);
                const wrapper = mount(<ShowUserInfo
                    fields={fieldDefinitions}
                    gitUser={gitUser}
                    onGetUserButtonClicked={function() {
                        result = true;
                    }}
                />);

                expect(wrapper.find('#' + id).text()).toEqual(value.sample);
            });

            it('Renders ' + id + ' label containing ' + value.label, () => {
                // console.log(fieldDefinitions);
                const wrapper = mount(<ShowUserInfo
                    fields={fieldDefinitions}
                    gitUser={gitUser}
                    onGetUserButtonClicked={function() {
                        result = true;
                    }}
                />);
                expect(wrapper.find('[htmlFor=\"' + id + '\"]').text()).
                    toEqual(value.label + ':');
            });
        }

        it('simulates button click', () => {
            let result = false;
            const wrapper = mount(<ShowUserInfo
                fields={fieldDefinitions}
                gitUser={gitUser}
                onGetUserButtonClicked={function() {
                    result = true;
                }}
            />);
            wrapper.find('button').simulate('click');
            expect(result).toEqual(true);
        });
        function runAllTestsOnGitUserFields() {
            for (let field in fieldDefMocks) {
                runTestCycleOnValue(fieldDefMocks[field].id, fieldDefMocks[field]);
            }
        }

        runAllTestsOnGitUserFields();
        // runTestCycleOnValue('company', 'company-unknown');
    },
)
;
