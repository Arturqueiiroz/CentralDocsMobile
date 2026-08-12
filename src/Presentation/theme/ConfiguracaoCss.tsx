import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 25,
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    profileAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    profileTextContainer: {
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
    },
    profilePlan: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    optionsGroup: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginBottom: 25,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    iconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    optionSubtitle: {
        fontSize: 11,
        marginTop: 2,
    },
    divider: {
        height: 1,
    },
    helpBanner: {
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        marginBottom: 30,
    },
    helpTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    helpSubtitle: {
        fontSize: 12,
        lineHeight: 18,
    },
    footerInfo: {
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    versionText: {
        fontSize: 11,
    },
    logoutText: {
        fontSize: 13,
        fontWeight: '600',
    },
});

export default styles;