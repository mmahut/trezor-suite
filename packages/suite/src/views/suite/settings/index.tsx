/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button, P } from '@trezor/components';
import { AppState } from '@suite-types/index';

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-top: 30px;
    width: 100%;
    max-width: 500px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
`;

const LabelCol = styled.div`
    display: flex;
    flex: 1;
`;

const ValueCol = styled.div`
    display: flex;
    flex: 1;
`;

const ActionCol = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;

const Label = styled(P)``;

const ActionButton = styled(Button)`
    padding: 11px 12px;
    min-width: 100px;
`;

interface Props {
    // device: AppState['suite']['device'];
    device: any;
    applySettings: any; // todo
    changePin: any; // todo
}

const Settings = ({ device, applySettings, changePin }: Props) => {
    const [label, setLabel] = useState('');

    useEffect(() => {
        setLabel(device.features.label);
    }, [device.features.label, device.features.labels]);

    const { features } = device;

    return (
        <Wrapper>
            <Row>
                <LabelCol>
                    <Label>Label</Label>
                </LabelCol>
                <ValueCol>
                    <Input
                        value={label}
                        onChange={(event: FormEvent<HTMLInputElement>) =>
                            setLabel(event.currentTarget.value)
                        }
                    />
                </ValueCol>
                <ActionCol>
                    <ActionButton isWhite onClick={() => applySettings({ label })}>
                        change
                    </ActionButton>
                </ActionCol>
            </Row>

            <Row>
                <LabelCol>
                    <Label>Pin protection</Label>
                </LabelCol>
                <ValueCol>
                    <P>{features.pin_protection ? 'enabled' : 'disabled'}</P>
                </ValueCol>
                <ActionCol>
                    {!features.pin_protection && (
                        <ActionButton isWhite onClick={() => changePin()}>
                            enable
                        </ActionButton>
                    )}
                    {features.pin_protection && (
                        <ActionButton isWhite onClick={() => changePin({ remove: true })}>
                            disable
                        </ActionButton>
                    )}
                </ActionCol>
            </Row>

            <Row>
                <LabelCol>
                    <Label>Passphrase protection</Label>
                </LabelCol>
                <ValueCol>
                    <P>{features.passphrase_protection ? 'enabled' : 'disabled'}</P>
                </ValueCol>
                <ActionCol>
                    {!features.passphrase_protection && (
                        <ActionButton
                            isWhite
                            onClick={() => applySettings({ use_passphrase: true })}
                        >
                            enable
                        </ActionButton>
                    )}
                    {features.passphrase_protection && (
                        <ActionButton
                            isWhite
                            onClick={() => applySettings({ use_passphrase: false })}
                        >
                            disable
                        </ActionButton>
                    )}
                </ActionCol>
            </Row>

            {/* 
                TODO for both:
                { name: 'homescreen', type: 'string' },
            */}

            {/* 
                TODO for T2
                { name: 'passphrase_source', type: 'number' },
                ?{ name: 'auto_lock_delay_ms', type: 'number' },?
                { name: 'display_rotation', type: 'number' },
            */}
        </Wrapper>
    );
};

export default Settings;
