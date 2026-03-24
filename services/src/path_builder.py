import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

f = pd.read_csv("constellation_boundaries.txt", delimiter = '|')
fill_names = pd.read_csv("path.txt", header=None)[0].str.strip().str.upper().values
const = np.array(f[" const"])
ra = np.array([])
dec = np.array(f[' dec ']).astype(float)
for i in range(np.size(np.array(f["h "]))):
    cur = np.array(f["h "])[i].split()
    ra = np.append(ra, 15* (float(cur[0]) + float(cur[1]) / 60. + float(cur[2]) / 3600.))
    const[i] = const[i].replace(' ', '')
constellations = [
    'AND', 'ANT', 'APS', 'AQR', 'AQL', 'ARA', 'ARI', 'AUR', 'BOO', 'CAE',
    'CAM', 'CAP', 'CAR', 'CAS', 'CEN', 'CEP', 'CET', 'CHA', 'CIR', 'CMA',
    'CMI', 'CNC', 'COL', 'COM', 'CRA', 'CRB', 'CRT', 'CRU', 'CRV', 'CVN',
    'CYG', 'DEL', 'DOR', 'DRA', 'EQU', 'ERI', 'FOR', 'GEM', 'GRU', 'HER',
    'HOR', 'HYA', 'HYI', 'IND', 'LAC', 'LEO', 'LEP', 'LIB', 'LMI', 'LUP',
    'LYN', 'LYR', 'MEN', 'MIC', 'MON', 'MUS', 'NOR', 'OCT', 'OPH', 'ORI',
    'PAV', 'PEG', 'PER', 'PHE', 'PIC', 'PSA', 'PSC', 'PUP', 'PYX', 'RET',
    'SCL', 'SCO', 'SCT', 'SER', 'SEX', 'SGE', 'SGR', 'TAU', 'TEL', 'TRA',
    'TRI', 'TUC', 'UMA', 'UMI', 'VEL', 'VIR', 'VOL', 'VUL',
]
def fill_segment_to_edge(sra, sdec, color='#00e600', alpha=0.2, zorder=1):
    sra = np.asarray(sra)
    sdec = np.asarray(sdec)

    # сегмент у левого края карты (RA = 360)
    if np.isclose(sra[0], 360) and np.isclose(sra[-1], 360):
        poly_ra = np.concatenate([sra, [360]])
        poly_dec = np.concatenate([sdec, [sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    # сегмент у правого края карты (RA = 0)
    elif np.isclose(sra[0], 0) and np.isclose(sra[-1], 0):
        poly_ra = np.concatenate([sra, [0]])
        poly_dec = np.concatenate([sdec, [sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    # если сегмент начинается у 360 и заканчивается не у 360
    elif np.isclose(sra[0], 360):
        poly_ra = np.concatenate([sra, [360, 360]])
        poly_dec = np.concatenate([sdec, [sdec[-1], sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    # если сегмент заканчивается у 360
    elif np.isclose(sra[-1], 360):
        poly_ra = np.concatenate([sra, [360, sra[0]]])
        poly_dec = np.concatenate([sdec, [sdec[0], sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    # если сегмент начинается у 0
    elif np.isclose(sra[0], 0):
        poly_ra = np.concatenate([sra, [0, 0]])
        poly_dec = np.concatenate([sdec, [sdec[-1], sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    # если сегмент заканчивается у 0
    elif np.isclose(sra[-1], 0):
        poly_ra = np.concatenate([sra, [0, sra[0]]])
        poly_dec = np.concatenate([sdec, [sdec[0], sdec[0]]])
        plt.fill(poly_ra, poly_dec, color=color, alpha=alpha, zorder=zorder)

    else:
        # обычный случай без шва
        plt.fill(sra, sdec, color=color, alpha=alpha, zorder=zorder)
def constellation_center_largest_segment(racur, deccur):
    racur = np.asarray(racur)
    deccur = np.asarray(deccur)

    if len(racur) == 0:
        return np.nan, np.nan

    # если разрыва по краю нет — обычный центр
    if np.max(racur) - np.min(racur) <= 180:
        return np.mean(racur), np.mean(deccur)

    # делим точки на 2 сегмента: "около 0" и "около 360"
    left_mask = racur < 180
    right_mask = racur >= 180

    n_left = np.sum(left_mask)
    n_right = np.sum(right_mask)

    # берём сегмент, где больше точек
    if n_left > n_right:
        return np.mean(racur[left_mask]), np.mean(deccur[left_mask])
    elif n_right > n_left:
        return np.mean(racur[right_mask]), np.mean(deccur[right_mask])
    else:
        # если точек поровну, можно взять сегмент с меньшим RA-разбросом
        spread_left = np.ptp(racur[left_mask]) if n_left > 0 else np.inf
        spread_right = np.ptp(racur[right_mask]) if n_right > 0 else np.inf

        if spread_left <= spread_right:
            return np.mean(racur[left_mask]), np.mean(deccur[left_mask])
        else:
            return np.mean(racur[right_mask]), np.mean(deccur[right_mask])

def center_one_half_prefer_right(racur, deccur):
    racur = np.asarray(racur)
    deccur = np.asarray(deccur)

    if len(racur) == 0:
        return np.nan, np.nan

    # если шва нет, обычный центр
    if np.max(racur) - np.min(racur) <= 180:
        return np.mean(racur), np.mean(deccur)

    # правая сторона картинки при xlim(360, 0) соответствует малым RA (~0h)
    right_mask = racur < 180
    left_mask = racur >= 180

    n_right = np.sum(right_mask)
    n_left = np.sum(left_mask)

    # при равенстве предпочитаем правую сторону (~0h)
    if n_right >= n_left and n_right > 0:
        return np.mean(racur[right_mask]), np.mean(deccur[right_mask])
    elif n_left > 0:
        return np.mean(racur[left_mask]), np.mean(deccur[left_mask])
    else:
        return np.mean(racur), np.mean(deccur)


def plot_wrapped_line(x, y, **kwargs):
    x = np.asarray(x)
    y = np.asarray(y)

    if len(x) < 2:
        return

    seg_x = [x[0]]
    seg_y = [y[0]]

    for i in range(1, len(x)):
        x1, x2 = x[i - 1], x[i]
        y1, y2 = y[i - 1], y[i]

        if abs(x2 - x1) > 180:
            if x1 > x2:  # 350 -> 10
                t = (360 - x1) / ((x2 + 360) - x1)
                y_cross = y1 + t * (y2 - y1)

                seg_x.append(360)
                seg_y.append(y_cross)
                plt.plot(seg_x, seg_y, **kwargs)

                seg_x = [0, x2]
                seg_y = [y_cross, y2]

            else:        # 10 -> 350
                t = (0 - x1) / ((x2 - 360) - x1)
                y_cross = y1 + t * (y2 - y1)

                seg_x.append(0)
                seg_y.append(y_cross)
                plt.plot(seg_x, seg_y, **kwargs)

                seg_x = [360, x2]
                seg_y = [y_cross, y2]
        else:
            seg_x.append(x2)
            seg_y.append(y2)

    plt.plot(seg_x, seg_y, **kwargs)
# РАБОЧИЙ 2
centers_ra = []
centers_dec = []

for i in range(88):
    ins = np.where(const == constellations[i])[0]
    racur = ra[ins]
    deccur = dec[ins]

    if len(racur) < 2:
        continue

    rac = np.append(racur, racur[0])
    decp = np.append(deccur, deccur[0])

    seg_ra = [rac[0]]
    seg_dec = [decp[0]]
    segments = []

    if np.isin(constellations[i], fill_names) and len(racur) > 0:
        if constellations[i] == 'SCL':
            cra, cdec = 10.4, -32.12
        else:
            cra, cdec = center_one_half_prefer_right(racur, deccur)

        centers_ra.append(cra)
        centers_dec.append(cdec)

    for k in range(1, len(rac)):
        ra1, ra2 = rac[k - 1], rac[k]
        dec1, dec2 = decp[k - 1], decp[k]

        if abs(ra2 - ra1) > 180:
            if ra1 > ra2:   # e.g. 350 -> 10
                t = (360 - ra1) / ((ra2 + 360) - ra1)
                dec_cross = dec1 + t * (dec2 - dec1)

                seg_ra.append(360)
                seg_dec.append(dec_cross)
                segments.append((np.array(seg_ra), np.array(seg_dec)))

                seg_ra = [0, ra2]
                seg_dec = [dec_cross, dec2]

            else:           # e.g. 10 -> 350
                t = (0 - ra1) / ((ra2 - 360) - ra1)
                dec_cross = dec1 + t * (dec2 - dec1)

                seg_ra.append(0)
                seg_dec.append(dec_cross)
                segments.append((np.array(seg_ra), np.array(seg_dec)))

                seg_ra = [360, ra2]
                seg_dec = [dec_cross, dec2]
        else:
            seg_ra.append(ra2)
            seg_dec.append(dec2)

    segments.append((np.array(seg_ra), np.array(seg_dec)))
    for idx, (sra, sdec) in enumerate(segments):
        plt.plot(sra, sdec, lw=1, color='white')
    
        if np.isin(constellations[i], fill_names):
            fill_segment_to_edge(sra, sdec, color='#00e600', alpha=0.2, zorder=0)

centers_ra = np.array(centers_ra)
centers_dec = np.array(centers_dec)
path_names = fill_names

center_names = []
for name in constellations:
    if name in fill_names:
        ins = np.where(const == name)[0]
        if len(ins) > 0:
            center_names.append(name)

order = []
for name in path_names:
    if name in center_names:
        order.append(center_names.index(name))

order = np.array(order)

plot_wrapped_line(
    centers_ra[order],
    centers_dec[order],
    color='#009600',
    linewidth=2.5,
    zorder=10
)
plt.gca().set_facecolor('black')
plt.xlim(360, 0)
plt.ylim(-90, 90)
