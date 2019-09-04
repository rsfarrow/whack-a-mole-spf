<template>
  <v-content class="mx-3">
    <h1 class="display-2">
      About Game:
    </h1>
    <p class="body-1">
      This game was created as part of a coding challenge.  It's a simple rendition of whack-a-mole. A classic game where moles pop out of their little holes and you have to whack them.
      If there's any isssues feel free to create a github issue or email me at rsfarrow@ncsu.edu.
      This was built on the VENoM Stack (Vue, Expess, Node, Mongo) with Vuetify for the material design components.
    </p>
    <h1 class="display-2">
      About Me:
    </h1>
    <p class="body-1">
      My name is Sam Farrow and I graduated from North Carolia State University in 2016. I began my professional career at Manhattan Associates where I stayed for nearly 2 years.  Currently
      I work as a UI Engineer at BioiQ.  When I'm not working I'm playing with my dogs, spending time with my lovely wife and friends, practicing Muay Thai, or trying to keep up with the latest tech.
    </p>
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(n,index) in items"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat
                    tile
                    class="d-flex"
            >
              <v-img
                :src="n.src"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-content>
</template>
<script>
export default {
  name: 'about',
  data: () => ({
    items: [
      { title: 'wife', src: 'https://lh3.googleusercontent.com/usfRmsP3R2FR524VDb7TWHx8Fv313vdmLwFUL3QK8wBRKdqkrAF9HRZPkaXA8IJFNHIIE7G526WRNvzhoBP5nmgg-msNyGg1oFg65HfA_Pj9evPc-t1q3R6HIeD6x2MS49Mxi7FQ-oU3CP_0TFx6YjNnoutjyW1pMjkaa6gYOxEEbesamrWnZRMCexoXLVAEPfArfHI09gnGA3s-zF7uqRu-L07m4j1I4OQr_8CRY7L9SIreBUvL3M1pV_oX5qPt7g4UJl-GlJHRuRIV0mRSgQuqbqqAiJpXHTIg0uRwu3S0_lBsoDbYN-_7h8w9lZVdFOknCNHaU_1b4jq4JeDxqc7g5Wx6CJI7gUzgxhLV02f5_E2wAMAVw4D0QgHFX2Bnsi9WZKOhZGWl0zYttbLbCgi0eeB9nrFCVu8YA2Esyrrvt-RMCHQo-sXkmlHZLXVlFLSVHvU73fVoCuP3DUNlAuLq72QwshTFZJet7fsV4iEmY51UaCbgyz2WXUY0KINfwkBl2YxBj4SmO9AyewRXkAdNha1S4rROSTFgeNQAGiAfQ7ZfZy06mAcnyauoXyfwbdW_KWvH5G1q9LK-5cAomKjuFKYFh4bw6WO96TJ6CceTeP4TBUFYtMRSn2DALckHP4nB_HBQhVlqPnQ_5sow7GaQYoWaxvNLpPDX3L-RiEpxq4HQ-o1U_tgSBK82P8H-CZgImZrsTHIwO0TQnvsMeNOAMN7ntj96wFMbJlABMmb4C9LvvQ=w1224-h1834-no' },
      { title: 'cap', src: 'https://lh3.googleusercontent.com/qvc8lw5sP4AQpg9VTEMELEoSt8XZYLN2Wa1RnNXz2nYkSRTgzw84tvN9aQohcQnMO0bFIjse0GXA1AXBlzwJu7QJ_Ni__kPvhTIApOmeQnTscw0J9ZJQPW5CDjBYt_mrFrxHV2cptYEXNf62oBMK4nhk7pTTi3q8-0OGknYeCusURojPEmorMLmaSufpAx-SdGVBIeXwtKkCt5nG4aVetbbKDMul_h2LpZ5ivXp-_SePofsq4KIq1a-TYQpZxG49hoQAtbKxXshZCwwRFfT8kjNqlgKsc4BSdyQpnZO22QyYXSNowO8eALTyAkThy8Txc6NsV1VvRSctcKGuRWkKAQXr4R3wEIw7BPJq1-cFcay4Zs6a_BAjy8z5gdLG5K2a19yj-RwCQNnhznuuY-z_8ZPLSZMTYmThOitVLNLU4iLh2TwOy9zGDsB0vYZa1ofrKyQNgp4NkqD-Ez81ZYzmdS51iRTLkEEpeynKd0GtOtfnwtBheUUc0K3W8u0eaDanmigswl4niMQaIp5-0sPuHSXdv_GYjfwHvFp5iFP8DgslytSLrlG82LOcpH0LwvkJrG-kXTzdJ1kJKpT4iQn-aaGNFrD-QzEF0BgWcA30qGOE7UndLQ4_WU99esGriuUItpcADZ6h3WtMyPb9HiXmSv8tCyQfQRGs8YqpEqEe4yFQUnPNVitSVVPyddIPXfb3sHnk1UEgjtUjfbcgWY956kqTpJiJDNAiCw7K3BZyz-5wWNhfEg=s1834-no' },
      { title: 'MT', src: 'https://lh3.googleusercontent.com/UPgnVMjNkX5qU8RbgBcnKK9lsTeq2F8lcDHJa6G_aVBa-oXAlmA4zDSiqE8EA6qaM6pVbiA3iOeJdEtwfsIXSJk3RTeaiClbzAgT5RUJga1zapRGfLU5P3Zo7XEQ65SkQCam0OAnMvIO4KtVUvH4P-8TBJBdQJ_qJo2n5j5Ugl92_fVgwqh9FtTWkZ8PLOTSJsScPgbFrc6poJ7Gem2r4LGTDR3FNA1lg_p7Pzy0FYm5M7NWWDfEQzFR0SkPJOYByoiE-VdpxTalfmei06QVQPoETcUGOfUw3qqtmLLUrM7oDCJHNaVgUnOahjbwmZlzQWRdl9lWzMCW0B107AWpC3YAoFksxPK2ELd25CZqdmtJJ3YCuOJHvjKNtW4fqr2VJ5Vf9NXJxB_I9uvEydTnZuiqMu4w_ari7FikJFinD8UIuzjaPZYOXoICNATLhlGkqt658hkh4b4Y_p9beUV3QuPwVAbov9OGzYPL18FB954V4utGmJfgPrWwdtk2GZi2HK5BpcxCpgMu5f-X0chvcHu2RBHAlxmE-lnBJaTpUPqIuYYCd3t_sdRRfXIqydKYvVXWljDMq9tVbngnhTspW1HD3RQTVzhBqMZufPkYpKHafAZm6o-zwthpSV8IEntLNxmKK4WiLJ40VqMO4K7glpkJP20IOGiXxaFn3Dxw5N1i0pmrldOpfC_iEG3784ihaTP5-jVBvnE4tHkncj7-68p4o2RrWSctvQmJH0DrVAoChm1P4w=w1376-h1834-no' },
      { title: 'MT-team', src: 'https://lh3.googleusercontent.com/wlQZV6alqGGeZ6fR0zlfXYV_KoDdKncWmxxoFMCn65rIuftlt2GpNW50F-LNnFVJqT59iQysEi2PCScHy2tiVQQxY2BR4_-AXueBjKQofVByBJcX9eHYHXlPrhtaAckR03TNxXTscpqqkxthwz7u1TfkZ2BRiY4rLKk88-9UOHz0K_EDwqSqxE6O7SAUjJWAwzegpXFCFWCZhwg10NeYttm5OUBxzGcEpFyKAI5Qf6z-du1ugqWNBUrGBL2KJ5Y4L7Ij2iCdc2kaVoOtVPh2wm_ZEQhRbPI1eAOwGs3MLMNu39InKGWV77uNdSIeApZTEfEKA6gEIJyOlPjE3nH3Z68SQ4hiQTXpcTww6b-vgH06NqyOPlGIB7Ob0Kw6tO9BqthD2yLD2fmGrsqkOdV9M-fELDdJjz9rir_1VRBJMGOt-MERn8f_ZdE0wn-2Th2uwBQwzHucr1nJruiJEJHbqwOq1o9bX3252ff3RO6za2-f9Emed2c3XJViS8h8ALkufYw2mKDI2p7ufNdYi6J9O2MXY4aGVKoSLzjU4MO5SVrjRxbPJnqgRzWaIgfbSE6JDazLkxl6dWEV4IYNCyclh9md63y_HY2uav4GaAoy0uQhGxxsnWRAcZy6P8LFIbEHQH4m3yr1C3apprRG1Z_P0aNoFsMO63pSAN1ibEuO-__hB94BVH6mdmh7V3btNVdKqPJQ8wxtE_QRYgKrwgnAcFsmVZiWGd2ctf86TtJ-sxIyU5i1Uw=s1080-no' },
      { title: 'shadow', src: 'https://lh3.googleusercontent.com/xiVupOtYfRSyCeqJlrPUTR3YLg0SlATRYjQwU7N73iptieBxjaBumBb2reTqQxVYxUyj01oexwkbalr-aYVKcsVqpmGd3_ne1oJCoGP0SmRVJutMsqmmLHCmD-bOrzHU87sE0MyXAjMhDYzHkiGP9LfEFM1xPZkqMVfIabHwUApuJ3Gfe9gM67VzILia3zV9qXuz_3KI21eMNu0AKxy2nMocty_bX0Q9Ee__X6dEJGuMHV7XIhVdXLFEae503lu09XvyHG9k4SGv1VWjHI7ugRB_SH2ukQ2-LE7V4qdSZax9pYVH_njz5_VkT9K3U95rcaVwbxIwvQ0KpPAhGzW9NEwUNWXpl0PEyHJutf46ia7EvtyHylP6ffl6HBupammiiwsELg-edsiw3Zp3el7eYwlwoXeoZ7MS45OWx19v2nd_GYXTTCcH44r_DDe0lSgV7q5ZpHs8e3eDWqUL4zwcuXllZJBkzFBReE2QTZIE5ZsGlDuR_iGm7a31UHtVNJNlWHvO_3VL4SbQ8XzmnifKbG_Kiwh_zzb7qECIeTJYZJqO7HQz3wxedxUVECB99FcgOJ8Ig1TZM9jC-RUnZ5A0thfQRBepb2ZAtRfKc1snBusMtwatzJzpOAWdDUadSD0rEzUciLhsaBS8zTmZ76P4LhxUC9Y23oO2GOqskcfw-mUdFpGOeQH0lWM-RDxnGQ_XfcvN-4RwInSYAaT48ivthfVPKNfRFNyt_PfvBTwVLwDUh2OCuw=w1376-h1834-no' },
      { title: 'mr&mrs', src: 'https://lh3.googleusercontent.com/noLtbuSDPXNiUFZzpGLfwSwVkuYebqPRVG0ehnRSiSqd8UaZWxTYVCBiuu-AhqKCsmbvW6A7YgTzmAJ9husj-AvJ7KOh5EUTvvl6THYIL1JQ01Zn3Ub-zzWuHHBTmjlWa_1682u-FTaERgEOjk-yEgOirlfmtUY1SfKuyzAsCvnO7jkSvuiZmSR6eq3rShnbVK2IiWNOeU5dnDFCIX_qXu0s7VENSLTa54wK__it0DBdbmB3O4pI8PRnNj5VZA3LqALwqlN9y7xwPF6Zyb_b2HUeNAX4xubvkOXLr683J-h3XyXEmGNodVNWECi_pVcNKxUiWKYpIOsjtypNn1Ozy2qNhiL7VOK5bOQIAbacOfK_Ep6JZhy9BcJuhmuVw1GjpA2CGjQ9ICTPRtBxyE7eHth0NT9tc5ZQkO_vZ6Y1We1YPN_FmvqBf1XVBwz75eyX-qFUh9vKbe3Vja7UZBlmucwynj6xk0uh42Dmg7TjupTvJ1pD_A3Tz_hRhTU-fmY_7xOsbxr-v9oi6JCvGr-T9wgZW-2r_i8oAb_0YMvLZ3wcISdxOuJ44v5HWlEaNbv1S_a73wrybznFXl7n_qL7dthRHajmSwzFnl1lewc0wq2f39cV509xIMx41nbw7j2zIcYDf1u2J1p7H0ozmuaQa1uaqeigG6kP9H0NvLVP1bmXvHXRM9jJDHgMuXlLW28oUZpgg7Lxx4L1HHQrMBYK5huYHsCUaZghBpUhoBuoTtn8c4Rl5g=w620-h432-no' }
    ]
  })
}
</script>
