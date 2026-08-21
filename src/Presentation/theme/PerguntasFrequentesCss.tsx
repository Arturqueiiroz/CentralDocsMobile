import { StyleSheet } from 'react-native';

const BRAND = {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#DBEAFE',
    primarySoft: '#EFF6FF',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },
    navBackButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
    navIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: BRAND.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        marginBottom: 8,
        elevation: 2,
        shadowColor: BRAND.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
    },
    resultsCount: {
        fontSize: 12,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    listContainer: {
        gap: 12,
        marginTop: 8,
    },
    card: {
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionColumn: {
        flex: 1,
    },
    badgePill: {
        alignSelf: 'flex-start',
        backgroundColor: BRAND.primary,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    questionText: {
        fontSize: 15,
        fontWeight: '600',
    },
    cardBody: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: BRAND.primaryLight,
        marginBottom: 12,
    },
    answerText: {
        fontSize: 14,
        lineHeight: 22,
        paddingLeft: 48,
    },
    emptyContainer: {
        padding: 30,
        alignItems: 'center',
    },
    emptyIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: BRAND.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    emptyText: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    emptySubtext: {
        fontSize: 13,
        textAlign: 'center',
    },

    // --- Card de suporte técnico (final da lista) ---
    supportCard: {
        marginTop: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: BRAND.primaryLight,
        backgroundColor: BRAND.primarySoft,
        padding: 16,
    },
    supportHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
    },
    supportIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: BRAND.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    supportTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    supportText: {
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 14,
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        alignSelf: 'stretch',
        backgroundColor: BRAND.primary,
        borderRadius: 10,
        paddingVertical: 12,
    },
    supportButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default styles;