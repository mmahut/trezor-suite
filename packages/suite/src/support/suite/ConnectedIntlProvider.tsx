import * as React from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import en from 'react-intl/locale-data/en';
import cs from 'react-intl/locale-data/cs';
import bn from 'react-intl/locale-data/bn';
import de from 'react-intl/locale-data/de';
import el from 'react-intl/locale-data/el';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import id from 'react-intl/locale-data/id';
import it from 'react-intl/locale-data/it';
import ja from 'react-intl/locale-data/ja';
import nl from 'react-intl/locale-data/nl';
import pl from 'react-intl/locale-data/pl';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';
import uk from 'react-intl/locale-data/uk';
import zh from 'react-intl/locale-data/zh';
import { AppState } from '@suite-types';

// Add MessageDescriptor type to values entry
export interface ExtendedMessageDescriptor extends FormattedMessage.MessageDescriptor {
    values?: {
        [key: string]: string | React.ReactElement | FormattedMessage.MessageDescriptor;
    };
}

export interface Messages {
    [key: string]: FormattedMessage.MessageDescriptor;
}

addLocaleData([
    ...en,
    ...cs,
    ...bn,
    ...de,
    ...el,
    ...es,
    ...fr,
    ...id,
    ...it,
    ...ja,
    ...nl,
    ...pl,
    ...pt,
    ...ru,
    ...uk,
    ...zh,
]);

const mapStateToProps = (state: AppState) => ({
    locale: state.suite.language,
    messages: state.suite.messages,
});

interface ReactIntlProps {
    locale: AppState['suite']['language'];
    messages: AppState['suite']['messages'];
}

const ReactIntlProvider: React.FC<ReactIntlProps> = ({ children, locale, messages }) => (
    <IntlProvider locale={locale} messages={messages}>
        {children}
    </IntlProvider>
);

export default connect(mapStateToProps)(ReactIntlProvider);
