/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button, P, Icon } from '@trezor/components';
import { AppState } from '@suite-types/index';
import { resolveStaticPath } from '@suite-utils/nextjs';
import elementToHomescreen from '@suite/utils/suite/elementToHomescreen';

const IMAGE_NAMES_T1 = [
    'original', // note - has to be first
    'blank',
    'circleweb',
    'circuit',
    'starweb',
    'stars',
    'bitcoin_b2',
    'bitcoin_shade',
    'bitcoin_b',
    'bitcoin_full',

    'bitcat',
    'nyancat',

    'coffee',
    'flower',
    'saturn',
    'jupiter',
    'einstein',

    'piggy',

    'honeybadger',
    'dragon',
    'narwal',
    'rabbit',
    'bunny',
    'rooster',

    'fancy',
    'genesis',
    'my_bank',
    'candle',
    'ancap',
    'anonymous',

    'mushroom',
    'invader',

    'mtgox',
    'electrum',
    'mycelium',

    'ethereum',
    'litecoin',
    'myetherwallet',
    'zcash',
    'dash',
    'bitcoin_cash',
    'bitcoin_gold',
    'vertcoin',
    'namecoin',
    'monacoin',
    'doge',
    'digibyte',
    'decred',

    'multibit',
    'reddit',
    'hacker',
    'polis',
];
const IMAGE_NAMES_T2 = [
    'default',
    'trezor',
    'btc',
    'ltc',
    'eth',
    'doge',
    'dash',
    // 'xmr',
    'zec',
    'anonymous',
    // 'polis',
    'hodl',
    'moon',
    'bitcoin_gold',
    'decred',
    'digibyte',
    'fujicoin',
    'monacoin',
    'namecoin',
    'vertcoin',
];

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

const OrientationButton = styled(Button)`
    margin-left: 3px;
`;

const BackgroundGallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const BackgroundImageT2 = styled.img`
    border-radius: 50%;
    margin: 5px;
`;

const BackgroundImageT1 = styled.img`
    margin: 5px;
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

    const setHomescreen = image => {
        console.log(image);
        const element = document.getElementById(image);
        const hex = elementToHomescreen(element, device.features.major_version);
        console.log({ hex });
        applySettings({ homescreen: hex });
    };

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

            {device.features.major_version === 2 && (
                <Row>
                    <LabelCol>
                        <Label>Display rotation</Label>
                    </LabelCol>
                    <ActionCol>
                        {[
                            { icon: 'ARROW_UP', value: 0 },
                            { icon: 'ARROW_RIGHT', value: 90 },
                            { icon: 'ARROW_DOWN', value: 180 },
                            { icon: 'ARROW_LEFT', value: 270 },
                        ].map(variant => (
                            <OrientationButton
                                key={variant.icon}
                                isWhite
                                onClick={() => applySettings({ display_rotation: variant.value })}
                            >
                                <Icon icon={variant.icon} />
                            </OrientationButton>
                        ))}
                    </ActionCol>
                </Row>
            )}

            <BackgroundGallery>
                {device.features.major_version === 1 &&
                    IMAGE_NAMES_T1.map(image => (
                        <BackgroundImageT1
                            key={image}
                            id={image}
                            onClick={() => setHomescreen(image)}
                            src={resolveStaticPath(`images/suite/homescreens/t1/${image}.png`)}
                        />
                    ))}

                {device.features.major_version === 2 &&
                    IMAGE_NAMES_T2.map(image => (
                        <BackgroundImageT2
                            key={image}
                            id={image}
                            onClick={() => setHomescreen(image)}
                            src={resolveStaticPath(`images/suite/homescreens/t2/${image}.png`)}
                        />
                    ))}
            </BackgroundGallery>
            {/* 
                TODO for both:
                { name: 'homescreen', type: 'string' }, custom load
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
